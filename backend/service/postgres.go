package service

import (
	"database/sql"
	"errors"
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
func (s *PostgresService) GetRestaurant(id string) (*db_model.Restaurant, error) {
	var rest db_model.Restaurant
	result := s.dbC.Preload("MenuCategories.MenuItems.Allergens").First(&rest, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &rest, nil
}

// GetMenuItems retrieves menu items for a specific restaurant
func (s *PostgresService) GetMenuItems(restaurantID string) ([]*db_model.MenuItem, error) {
	var menuItems []*db_model.MenuItem
	result := s.dbC.Where("restaurant_id = ?", restaurantID).Preload("Allergens").Find(&menuItems)
	if result.Error != nil {
		return nil, result.Error
	}
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
func (s *PostgresService) GetMenuCategories(restaurantID string) ([]*db_model.MenuCategory, error) {
	var categories []*db_model.MenuCategory
	result := s.dbC.Where("restaurant_id = ?", restaurantID).Preload("MenuItems").Find(&categories)
	if result.Error != nil {
		return nil, result.Error
	}
	return categories, nil
}

// GetAllAllergens retrieves all allergens
func (s *PostgresService) GetAllAllergens() ([]*db_model.Allergen, error) {
	var allergens []*db_model.Allergen
	result := s.dbC.Find(&allergens)
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
func (s *PostgresService) GetCart(tableSessionID int) (*db_model.Cart, error) {
	var cart db_model.Cart
	result := s.dbC.Preload("Items.MenuItem.Allergens").Where("table_session_id = ?", tableSessionID).First(&cart)
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
