CREATE TABLE carts
(
    id               SERIAL PRIMARY KEY,
    table_session_id INT NOT NULL REFERENCES table_sessions (id) ON DELETE CASCADE,
    total_cart_price INT NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE cart_items
(
    id                  SERIAL PRIMARY KEY,
    cart_id             INT NOT NULL REFERENCES carts (id) ON DELETE CASCADE,
    menu_item_id        INT NOT NULL REFERENCES menu_items (id) ON DELETE CASCADE,
    quantity            INT NOT NULL,
    added_by_account_id uuid NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
