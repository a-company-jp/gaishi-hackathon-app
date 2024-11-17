package service

import (
	"database/sql"
	"errors"
	"fmt"
	"github.com/a-company-jp/gaishi-hackathon-app/backend/graph/model"
	"log"
	"sort"
	"time"

	"github.com/a-company-jp/gaishi-hackathon-app/backend/db_model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PostgresService struct {
	dbC *gorm.DB
}

func NewPostgresService(dbC *gorm.DB) *PostgresService {
	return &PostgresService{
		dbC: dbC,
	}
}

// --- ユーティリティメソッド ---

// GetRestaurant retrieves a restaurant by ID
func (s *PostgresService) GetRestaurant(id int) (*db_model.Restaurant, error) {
	var rest db_model.Restaurant
	result := s.dbC.First(&rest, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &rest, nil
}

type MenuItemDetailed struct {
	MenuItemID       int
	Price            int
	Available        bool
	Name             string
	Description      *string
	MenuCategoryID   *int
	MenuCategoryName *string
	AllergenID       *int
	AllergenName     *string
}

// GetMenuItems retrieves detailed menu items for a specific restaurant in the specified language
func (s *PostgresService) GetMenuItems(restaurantID int, language string) ([]*model.MenuItem, error) {
	var results []MenuItemDetailed

	// 生のSQLクエリを使用して必要なデータを取得します
	query := `
        SELECT 
            mi.id AS menu_item_id,
            mi.price,
            mi.available,
            mit.name AS name,
            mit.description,
            mc.id AS menu_category_id,
            mct.name AS menu_category_name,
            a.id AS allergen_id,
            at.name AS allergen_name
        FROM menu_items mi
        LEFT JOIN menu_item_translations mit 
            ON mi.id = mit.menu_item_id AND mit.language_code = ?
        LEFT JOIN menu_categories mc 
            ON mi.category_id = mc.id
        LEFT JOIN menu_category_translations mct 
            ON mc.id = mct.menu_category_id AND mct.language_code = ?
        LEFT JOIN menu_item_allergens mia 
            ON mi.id = mia.menu_item_id
        LEFT JOIN allergens a 
            ON mia.allergen_id = a.id
        LEFT JOIN allergen_translations at 
            ON a.id = at.allergen_id AND at.language_code = ?
        WHERE mi.restaurant_id = ?
    `

	// クエリを実行し、結果を取得します
	err := s.dbC.Raw(query, language, language, language, restaurantID).Scan(&results).Error
	if err != nil {
		return nil, err
	}

	// 結果をマッピングするためのマップを作成します
	menuItemMap := make(map[int]*model.MenuItem)

	for _, r := range results {
		// メニューアイテムがまだマップに存在しない場合、作成します
		if _, exists := menuItemMap[r.MenuItemID]; !exists {
			var category *model.MenuCategory
			if r.MenuCategoryID != nil && r.MenuCategoryName != nil {
				category = &model.MenuCategory{
					ID:   fmt.Sprintf("%d", *r.MenuCategoryID),
					Name: *r.MenuCategoryName,
				}
			}

			menuItemMap[r.MenuItemID] = &model.MenuItem{
				ID:          fmt.Sprintf("%d", r.MenuItemID),
				Price:       r.Price,
				Available:   r.Available,
				Name:        r.Name,
				Description: r.Description,
				Category:    category,
				Allergens:   []*model.Allergen{},
			}
		}

		// アレルゲンが存在する場合、追加します
		if r.AllergenID != nil && r.AllergenName != nil {
			allergen := &model.Allergen{
				ID:   fmt.Sprintf("%d", *r.AllergenID),
				Name: *r.AllergenName,
			}
			menuItemMap[r.MenuItemID].Allergens = append(menuItemMap[r.MenuItemID].Allergens, allergen)
		}
	}

	// マップをスライスに変換します
	var menuItems []*model.MenuItem
	for _, mi := range menuItemMap {
		menuItems = append(menuItems, mi)
	}
	sort.Slice(menuItems, func(i, j int) bool {
		return menuItems[i].ID < menuItems[j].ID
	})

	return menuItems, nil
}

// GetMenuItemsByCategory retrieves menu items by category for a specific restaurant
func (s *PostgresService) GetMenuItemsByCategory(restaurantID string, categoryID string) ([]*db_model.MenuItem, error) {
	var menuItems []*db_model.MenuItem
	result := s.dbC.Where("restaurant_id = ? AND category_id = ?", restaurantID, categoryID).Preload("Allergens").Find(&menuItems)
	if result.Error != nil {
		return nil, result.Error
	}
	return menuItems, nil
}

// GetMenuCategories retrieves menu categories for a specific restaurant
func (s *PostgresService) GetMenuCategories(restaurantID int) ([]*model.MenuCategory, error) {
	var categories []*model.MenuCategory
	query := `
		SELECT
		    mc.id as id,
		    mct.name as name
		FROM menu_categories mc
		LEFT JOIN menu_category_translations mct
		    ON mc.id = mct.menu_category_id
		WHERE mc.restaurant_id = ?
		`
	result := s.dbC.Raw(query, restaurantID).Scan(&categories)
	if result.Error != nil {
		return nil, result.Error
	}
	return categories, nil
}

// GetAllAllergens retrieves all allergens
func (s *PostgresService) GetAllAllergens(lang string) ([]*model.Allergen, error) {
	var allergens []*model.Allergen
	query := `
		SELECT
		    a.id as id,
		    at.name as name
		FROM allergens a
		LEFT JOIN allergen_translations at
		    ON a.id = at.allergen_id
		WHERE at.language_code = ?
	`
	result := s.dbC.Raw(query, lang).Scan(&allergens)
	if result.Error != nil {
		return nil, result.Error
	}
	return allergens, nil
}

// --- セッション関連 ---

// JoinTableSession allows a user to join a table session
func (s *PostgresService) JoinTableSession(tableSessionID int, accountID uuid.UUID) (*db_model.TableSessionUser, error) {
	// Check if the session is active
	var session db_model.TableSession
	if err := s.dbC.First(&session, tableSessionID).Error; err != nil {
		return nil, err
	}
	if !session.IsActive.Bool {
		return nil, errors.New("table session is not active")
	}

	// Check if the user is already part of the session
	var tsUser db_model.TableSessionUser
	err := s.dbC.Where("table_session_id = ? AND account_id = ?", tableSessionID, accountID).First(&tsUser).Error
	if err == nil {
		// User already exists in the session
		return &tsUser, nil
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}

	// Get the next user number
	var maxUserNumber int64
	s.dbC.Model(&db_model.TableSessionUser{}).Where("table_session_id = ?", tableSessionID).Select("MAX(user_number)").Scan(&maxUserNumber)
	newUserNumber := maxUserNumber + 1

	// Create a new TableSessionUser
	newUser := db_model.TableSessionUser{
		AccountID:      accountID,
		TableSessionID: tableSessionID,
		UserNumber:     int(newUserNumber),
	}
	if err := s.dbC.Create(&newUser).Error; err != nil {
		return nil, err
	}
	return &newUser, nil
}

// CompleteTableSession marks a table session as completed
func (s *PostgresService) CompleteTableSession(tableSessionID int, sessionUserID int) error {
	// Update the table session
	err := s.dbC.Model(&db_model.TableSession{}).Where("id = ?", tableSessionID).Updates(map[string]interface{}{
		"is_active": false,
		"end_time":  time.Now(),
	}).Error
	if err != nil {
		return err
	}
	return nil
}

func (s *PostgresService) GetActiveTableSessionByTableID(tid int) (*db_model.TableSession, error) {
	var session db_model.TableSession
	err := s.dbC.Where("table_id = ? AND is_active = true", tid).First(&session).Error
	if err != nil {
		return nil, err
	}
	return &session, nil
}

type CartItemDetailed struct {
	CartItemID          int     `gorm:"column:cart_item_id"`
	Quantity            int     `gorm:"column:quantity"`
	AddedByAccountID    string  `gorm:"column:added_by_account_id"`
	MenuItemID          int     `gorm:"column:menu_item_id"`
	MenuItemName        string  `gorm:"column:menu_item_name"`
	MenuItemDescription *string `gorm:"column:menu_item_description"`
	MenuItemPrice       int     `gorm:"column:menu_item_price"`
	MenuItemAvailable   bool    `gorm:"column:menu_item_available"`
	MenuCategoryID      *int    `gorm:"column:menu_category_id"`
	MenuCategoryName    *string `gorm:"column:menu_category_name"`
	AllergenID          *int    `gorm:"column:allergen_id"`
	AllergenName        *string `gorm:"column:allergen_name"`
	UserNumber          int     `gorm:"column:user_number"`
	TableSessionUserID  int     `gorm:"column:table_session_user_id"`
}

func (s *PostgresService) GetCartByAccountID(accountID uuid.UUID, language string) (*model.Cart, error) {
	var tableSessionID int
	// Step 1: Find active table_session for the account
	err := s.dbC.Table("table_sessions").
		Select("table_sessions.id").
		Joins("JOIN table_session_users ON table_sessions.id = table_session_users.table_session_id").
		Where("table_session_users.account_id = ? AND table_sessions.is_active = ?", accountID, true).
		Scan(&tableSessionID).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("active table session not found for account")
		}
		return nil, err
	}

	// Step 2: Get the cart for the table_session
	var cart db_model.Cart
	err = s.dbC.Preload("Items").Where("table_session_id = ?", tableSessionID).First(&cart).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("cart not found for table session")
		}
		return nil, err
	}

	// Step 3: Get cart items with translations
	var cartItemsDetailed []CartItemDetailed

	query := `
        SELECT 
            ci.id AS cart_item_id,
            ci.quantity,
            ci.added_by_account_id,
            mi.id AS menu_item_id,
            mit.name AS menu_item_name,
            mit.description AS menu_item_description,
            mi.price AS menu_item_price,
            mi.available AS menu_item_available,
            mc.id AS menu_category_id,
            mct.name AS menu_category_name,
            a.id AS allergen_id,
            at.name AS allergen_name,
            tsu.user_number AS user_number,
            tsu.id AS table_session_user_id
        FROM cart_items ci
        JOIN carts c ON ci.cart_id = c.id
        JOIN table_session_users tsu ON ci.added_by_account_id = tsu.account_id AND tsu.table_session_id = c.table_session_id
        JOIN menu_items mi ON ci.menu_item_id = mi.id
        LEFT JOIN menu_item_translations mit ON mi.id = mit.menu_item_id AND mit.language_code = ?
        LEFT JOIN menu_categories mc ON mi.category_id = mc.id
        LEFT JOIN menu_category_translations mct ON mc.id = mct.menu_category_id AND mct.language_code = ?
        LEFT JOIN menu_item_allergens mia ON mi.id = mia.menu_item_id
        LEFT JOIN allergens a ON mia.allergen_id = a.id
        LEFT JOIN allergen_translations at ON a.id = at.allergen_id AND at.language_code = ?
        WHERE c.id = ?
    `

	err = s.dbC.Raw(query, language, language, language, cart.ID).Scan(&cartItemsDetailed).Error
	if err != nil {
		return nil, err
	}

	// Step 4: Map results to model.Cart
	cartModel := &model.Cart{
		ID:             fmt.Sprintf("%d", cart.ID),
		TableSession:   nil,
		TotalCartPrice: cart.TotalCartPrice,
		Items:          []*model.CartItem{},
	}

	// Map to hold MenuItemID to model.MenuItem
	menuItemMap := make(map[int]*model.MenuItem)

	for _, ci := range cartItemsDetailed {
		// Initialize the MenuItem in the map if not present
		if _, exists := menuItemMap[ci.MenuItemID]; !exists {
			var category *model.MenuCategory
			if ci.MenuCategoryID != nil && ci.MenuCategoryName != nil {
				category = &model.MenuCategory{
					ID:   fmt.Sprintf("%d", *ci.MenuCategoryID),
					Name: *ci.MenuCategoryName,
				}
			}

			menuItemMap[ci.MenuItemID] = &model.MenuItem{
				ID:          fmt.Sprintf("%d", ci.MenuItemID),
				Price:       ci.MenuItemPrice,
				Available:   ci.MenuItemAvailable,
				Name:        ci.MenuItemName,
				Description: ci.MenuItemDescription,
				Category:    category,
				Allergens:   []*model.Allergen{},
			}
		}

		// Add allergen if present
		if ci.AllergenID != nil && ci.AllergenName != nil {
			allergen := &model.Allergen{
				ID:   fmt.Sprintf("%d", *ci.AllergenID),
				Name: *ci.AllergenName,
			}
			menuItemMap[ci.MenuItemID].Allergens = append(menuItemMap[ci.MenuItemID].Allergens, allergen)
		}

		// TODO: fix this
		sessionUser := &model.TableSessionUser{
			TableSession: &model.TableSession{
				ID: fmt.Sprintf("%d", tableSessionID),
			},
			UserNumber: ci.UserNumber,
			Allergies:  []*model.Allergen{}, // Fetch allergies separately if needed
		}

		// Create CartItem
		cartItem := &model.CartItem{
			ID:       fmt.Sprintf("%d", ci.CartItemID),
			MenuItem: menuItemMap[ci.MenuItemID],
			Quantity: ci.Quantity,
			AddedBy:  sessionUser,
		}

		cartModel.Items = append(cartModel.Items, cartItem)
	}

	return cartModel, nil
}

func (s *PostgresService) GetActiveTableSessionByAID(aid string) (*model.TableSession, error) {
	var session db_model.TableSession
	query := `
		SELECT
		    ts.id as id,
		    ts.table_id as table_id,
		    ts.start_time as start_time,
		    ts.end_time as end_time,
		    ts.is_active as is_active,
		    ts.created_at as created_at,
		    ts.updated_at as updated_at,
		    c.id as cart_id,
		    c.total_cart_price as total_cart_price,
		    c.created_at as cart_created_at,
		    c.updated_at as cart_updated_at,
		    ci.id as cart_item_id,
		    ci.menu_item_id as menu_item_id,
		    ci.quantity as quantity,
		    ci.added_by_account_id as added_by_account_id
		FROM table_session_users tsu
		LEFT JOIN table_sessions ts
		    ON tsu.table_session_id = ts.id	
		LEFT JOIN carts c
			ON ts.id = c.table_session_id
		LEFT JOIN cart_items ci
			ON c.id = ci.cart_id
		WHERE tsu.account_id = ?
	`
	result := s.dbC.Raw(query, aid).Scan(&session)
	if result.Error != nil {
		return nil, result.Error
	}
	log.Printf("sessionxxx: %v", session)

	return &model.TableSession{}, nil
}

func (s *PostgresService) GetActiveTableSessionByTableUUID(tuuid uuid.UUID) (*db_model.TableSession, error) {
	type TargetSchema struct {
		TableSession db_model.TableSession
		Table        db_model.Table
	}
	var session TargetSchema
	err := s.dbC.Where("table.uuid = ? AND is_active = true", tuuid).First(&session).Error
	if err != nil {
		return nil, err
	}
	return &session.TableSession, nil
}

func (s *PostgresService) ListAccountsByTableSessionID(tableSessionID int) ([]*db_model.Account, error) {
	var accounts []*db_model.Account
	err := s.dbC.Table("accounts").
		Joins("INNER JOIN table_session_users ON accounts.id = table_session_users.account_id").
		Where("table_session_users.table_session_id = ?", tableSessionID).
		Find(&accounts).Error
	if err != nil {
		return nil, err
	}
	return accounts, nil
}

func (s *PostgresService) CreateTableSession(tuuid uuid.UUID) (*db_model.TableSession, error) {
	table, err := s.GetTableByUUID(tuuid)
	if err != nil {
		return nil, err
	}

	session := db_model.TableSession{
		TableID:   table.ID,
		StartTime: sql.NullTime{Time: time.Now(), Valid: true},
		IsActive:  sql.NullBool{Bool: true, Valid: true},
	}
	if err := s.dbC.Create(&session).Error; err != nil {
		return nil, err
	}
	return &session, nil
}

func (s *PostgresService) GetTableByUUID(tuuid uuid.UUID) (*db_model.Table, error) {
	var table db_model.Table
	err := s.dbC.Where("uuid = ?", tuuid).First(&table).Error
	if err != nil {
		return nil, err
	}
	return &table, nil
}

// GetTableSession retrieves a table session by ID
func (s *PostgresService) GetTableSession(tableSessionID int) (*db_model.TableSession, error) {
	var session db_model.TableSession
	result := s.dbC.Preload("Users").Preload("Cart.Items.MenuItem.Allergens").Preload("PlacedOrder.Items.MenuItem.Allergens").First(&session, tableSessionID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &session, nil
}

// --- ユーザー関連 ---

// SetUserAllergies sets allergies for a session user
func (s *PostgresService) SetUserAllergies(accountID uuid.UUID, allergenIDs []int) error {
	// Delete existing allergies
	err := s.dbC.Where("account_id = ?", accountID).Delete(&db_model.AccountAllergy{}).Error
	if err != nil {
		return err
	}

	// Add new allergies
	for _, allergenID := range allergenIDs {
		allergy := db_model.AccountAllergy{
			AccountID:  accountID,
			AllergenID: allergenID,
		}
		if err := s.dbC.Create(&allergy).Error; err != nil {
			return err
		}
	}
	return nil
}

// GetUserAllergies retrieves allergies for a session user
func (s *PostgresService) GetUserAllergies(sessionUserID int) ([]*db_model.Allergen, error) {
	var allergies []*db_model.Allergen
	err := s.dbC.Table("allergens").
		Joins("INNER JOIN table_session_user_allergies ON allergens.id = table_session_user_allergies.allergen_id").
		Where("table_session_user_allergies.table_session_user_id = ?", sessionUserID).
		Find(&allergies).Error
	if err != nil {
		return nil, err
	}
	return allergies, nil
}

// --- カート関連 ---

// GetCart retrieves a cart for a table session
func (s *PostgresService) GetCart(tableSessionID int) (*model.Cart, error) {
	var cart model.Cart
	query := `
		SELECT
		    c.id as id,
		    c.total_cart_price as total_cart_price,
		    c.table_session_id as table_session_id,
		    c.created_at as created_at,
		    c.updated_at as updated_at,
		    ci.id as cart_item_id,
		    ci.menu_item_id as menu_item_id,
		    ci.quantity as quantity,
		    ci.added_by_account_id as added_by_account_id,
		    mi.id as menu_item_id,
		    mi.price as price,
		    mi.available as available,
		    mit.name as name,
		    mit.description as description
		FROM carts c
		LEFT JOIN cart_items ci
		    ON c.id = ci.cart_id
		LEFT JOIN menu_items mi
			ON ci.menu_item_id = mi.id
		LEFT JOIN menu_item_translations mit
			ON mi.id = mit.menu_item_id
		WHERE c.table_session_id = ?
	`
	result := s.dbC.Raw(query, tableSessionID).Scan(&cart)
	if result.Error != nil {
		return nil, result.Error
	}
	return &cart, nil
}

func (s *PostgresService) GetCartByAID(aid, lang string) (*model.Cart, error) {
	// TODO: handle lang param
	var cart model.Cart
	query := `
		SELECT
		    c.id as id,
		    c.total_cart_price as total_cart_price,
		    c.table_session_id as table_session_id,
		    c.created_at as created_at,
		    c.updated_at as updated_at,
		    ci.id as cart_item_id,
		    ci.menu_item_id as menu_item_id,
		    ci.quantity as quantity,
		    ci.added_by_account_id as added_by_account_id,
		    mi.id as menu_item_id,
		    mi.price as price,
		    mi.available as available,
		    mit.name as name,
		    mit.description as description
		FROM table_session_users tsu
		LEFT JOIN carts c
		    ON tsu.table_session_id = c.table_session_id
		LEFT JOIN cart_items ci
		    ON c.id = ci.cart_id
		LEFT JOIN menu_items mi
		    ON ci.menu_item_id = mi.id
		LEFT JOIN menu_item_translations mit
		    ON mi.id = mit.menu_item_id
		WHERE tsu.account_id = ?
		`
	result := s.dbC.Raw(query, aid).Scan(&cart)
	if result.Error != nil {
		return nil, result.Error
	}
	return &cart, nil
}

// AddItemToCart adds an item to the cart
func (s *PostgresService) AddItemToCart(cartID int, menuItemID int, quantity int, accountID uuid.UUID) (*db_model.Cart, error) {
	// Create a new cart item
	cartItem := db_model.CartItem{
		CartID:           cartID,
		MenuItemID:       menuItemID,
		Quantity:         quantity,
		AddedByAccountID: accountID,
	}
	if err := s.dbC.Create(&cartItem).Error; err != nil {
		return nil, err
	}

	// Update total cart price
	err := s.UpdateCartTotalPrice(cartID)
	if err != nil {
		return nil, err
	}

	return s.GetCartByID(cartID)
}

// RemoveItemFromCart removes an item from the cart
func (s *PostgresService) RemoveItemFromCart(cartID int, cartItemID int, sessionUserID int) (*db_model.Cart, error) {
	// Delete the cart item
	err := s.dbC.Where("id = ? AND cart_id = ? AND added_by_account_id = ?", cartItemID, cartID, sessionUserID).Delete(&db_model.CartItem{}).Error
	if err != nil {
		return nil, err
	}

	// Update total cart price
	err = s.UpdateCartTotalPrice(cartID)
	if err != nil {
		return nil, err
	}

	return s.GetCartByID(cartID)
}

// UpdateCartTotalPrice updates the total price of the cart
func (s *PostgresService) UpdateCartTotalPrice(cartID int) error {
	var total int
	err := s.dbC.Model(&db_model.CartItem{}).
		Select("SUM(menu_items.price * cart_items.quantity)").
		Joins("JOIN menu_items ON cart_items.menu_item_id = menu_items.id").
		Where("cart_items.cart_id = ?", cartID).
		Scan(&total).Error
	if err != nil {
		return err
	}

	return s.dbC.Model(&db_model.Cart{}).Where("id = ?", cartID).Update("total_cart_price", total).Error
}

// GetCartByID retrieves a cart by ID
func (s *PostgresService) GetCartByID(cartID int) (*db_model.Cart, error) {
	var cart db_model.Cart
	result := s.dbC.Preload("Items.MenuItem.Allergens").First(&cart, cartID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &cart, nil
}

type CartFull struct {
	db_model.Cart
	Items []struct {
		db_model.CartItem
		MenuItem db_model.MenuItem
	}
}

func (s *PostgresService) GetCartFullByTableSession(tableSessionID int) (*CartFull, error) {
	var cart CartFull
	result := s.dbC.Preload("Items").Joins("MenuItem").Where("table_session_id = ?", tableSessionID).First(&cart)
	if result.Error != nil {
		return nil, result.Error
	}
	return &cart, nil
}

// PlaceOrder places an order from the cart
func (s *PostgresService) PlaceOrder(tableSessionID int) (*db_model.PlacedOrder, error) {
	// Retrieve the cart
	cart, err := s.GetCartFullByTableSession(tableSessionID)
	if err != nil {
		return nil, err
	}

	// Create a new PlacedOrder
	order := db_model.PlacedOrder{
		TableSessionID: cart.TableSessionID,
		TotalPrice:     cart.TotalCartPrice,
	}
	if err := s.dbC.Create(&order).Error; err != nil {
		return nil, err
	}

	// Move items from cart to order
	for _, cartItem := range cart.Items {
		orderedItem := db_model.OrderedItem{
			PlacedOrderID: order.ID,
			MenuItemID:    cartItem.MenuItemID,
			Quantity:      cartItem.Quantity,
			Price:         cartItem.MenuItem.Price * cartItem.Quantity,
			AddedByUser:   cartItem.AddedByAccountID,
		}
		if err := s.dbC.Create(&orderedItem).Error; err != nil {
			return nil, err
		}
	}

	// Clear the cart
	if err := s.dbC.Where("cart_id = ?", cart.ID).Delete(&db_model.CartItem{}).Error; err != nil {
		return nil, err
	}
	if err := s.UpdateCartTotalPrice(cart.ID); err != nil {
		return nil, err
	}

	return &order, nil
}

// GetOrder retrieves an order by ID
func (s *PostgresService) GetOrder(orderID int) (*db_model.PlacedOrder, error) {
	var order db_model.PlacedOrder
	result := s.dbC.Preload("Items.MenuItem.Allergens").First(&order, orderID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &order, nil
}
