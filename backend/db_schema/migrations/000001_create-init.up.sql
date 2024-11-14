-- 1. restaurants テーブルの作成
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. tables テーブルの作成
CREATE TABLE tables (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    table_number VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. table_visits テーブルの作成
CREATE TABLE table_visits (
    id SERIAL PRIMARY KEY,
    table_id INT NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. table_guests テーブルの作成
CREATE TABLE table_guests (
    id SERIAL PRIMARY KEY,
    table_visit_id INT NOT NULL REFERENCES table_visits(id) ON DELETE CASCADE,
    guest_number INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (table_visit_id, guest_number)
);

-- 5. allergens テーブルの作成
CREATE TABLE allergens (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. menu_categories テーブルの作成
CREATE TABLE menu_categories (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. menu_items テーブルの作成
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id INT REFERENCES menu_categories(id) ON DELETE SET NULL,
    price NUMERIC(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. orders テーブルの作成
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_visit_id INT NOT NULL REFERENCES table_visits(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'pending',
    total_price NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. menu_item_translations テーブルの作成
CREATE TABLE menu_item_translations (
    id SERIAL PRIMARY KEY,
    menu_item_id INT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    UNIQUE (menu_item_id, language_code)
);

-- 10. allergen_translations テーブルの作成
CREATE TABLE allergen_translations (
    id SERIAL PRIMARY KEY,
    allergen_id INT NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE (allergen_id, language_code)
);

-- 11. menu_item_allergens テーブルの作成
CREATE TABLE menu_item_allergens (
    id SERIAL PRIMARY KEY,
    menu_item_id INT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    allergen_id INT NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
    UNIQUE (menu_item_id, allergen_id)
);

-- 12. table_guest_allergies テーブルの作成
CREATE TABLE table_guest_allergies (
    id SERIAL PRIMARY KEY,
    table_guest_id INT NOT NULL REFERENCES table_guests(id) ON DELETE CASCADE,
    allergen_id INT NOT NULL REFERENCES allergens(id) ON DELETE CASCADE,
    UNIQUE (table_guest_id, allergen_id)
);

-- 13. menu_category_translations テーブルの作成
CREATE TABLE menu_category_translations (
    id SERIAL PRIMARY KEY,
    menu_category_id INT NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE (menu_category_id, language_code)
);

-- 14. order_items テーブルの作成
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. payments テーブルの作成
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50),
    amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
