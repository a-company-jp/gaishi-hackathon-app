CREATE TABLE public.restaurants
(
    id           SERIAL PRIMARY KEY,
    hostname     VARCHAR(255) NOT NULL,
    name         VARCHAR(255) NOT NULL,
    address      VARCHAR(255),
    phone_number VARCHAR(20),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hostname)
);

CREATE TABLE public.tables
(
    id            SERIAL PRIMARY KEY,
    restaurant_id INT         NOT NULL REFERENCES restaurants (id) ON DELETE CASCADE,
    table_number  VARCHAR(50) NOT NULL,
    capacity      INT         NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.table_sessions
(
    id         SERIAL PRIMARY KEY,
    table_id   INT NOT NULL REFERENCES tables (id) ON DELETE CASCADE,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time   TIMESTAMP,
    is_active  BOOLEAN   DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.accounts
(
    id           uuid PRIMARY KEY NOT NULL,
    firebase_uid VARCHAR(255),
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (firebase_uid)
);

CREATE TABLE public.table_session_users
(
    id               SERIAL PRIMARY KEY,
    account_id       uuid NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
    table_session_id INT  NOT NULL REFERENCES table_sessions (id) ON DELETE CASCADE,
    user_number      INT  NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (account_id, table_session_id)
);

CREATE TABLE public.allergens
(
    id         SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.menu_categories
(
    id            SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants (id) ON DELETE CASCADE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.menu_items
(
    id            SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurants (id) ON DELETE CASCADE,
    category_id   INT REFERENCES menu_categories (id) ON DELETE SET NULL,
    price         INT NOT NULL,
    available     BOOLEAN   DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.placed_orders
(
    id               SERIAL PRIMARY KEY,
    table_session_id INT NOT NULL REFERENCES table_sessions (id) ON DELETE CASCADE,
    total_price      INT NOT NULL DEFAULT 0,
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.menu_item_translations
(
    id            SERIAL PRIMARY KEY,
    menu_item_id  INT          NOT NULL REFERENCES menu_items (id) ON DELETE CASCADE,
    language_code VARCHAR(10)  NOT NULL,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    UNIQUE (menu_item_id, language_code)
);

CREATE TABLE public.allergen_translations
(
    id            SERIAL PRIMARY KEY,
    allergen_id   INT          NOT NULL REFERENCES allergens (id) ON DELETE CASCADE,
    language_code VARCHAR(10)  NOT NULL,
    name          VARCHAR(255) NOT NULL,
    UNIQUE (allergen_id, language_code)
);

CREATE TABLE public.menu_item_allergens
(
    id           SERIAL PRIMARY KEY,
    menu_item_id INT NOT NULL REFERENCES menu_items (id) ON DELETE CASCADE,
    allergen_id  INT NOT NULL REFERENCES allergens (id) ON DELETE CASCADE,
    UNIQUE (menu_item_id, allergen_id)
);

CREATE TABLE public.cookies
(
    id         uuid PRIMARY KEY NOT NULL,
    account_id uuid             NOT NULL REFERENCES accounts (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.accounts_table_selections
(
    id                SERIAL PRIMARY KEY,
    account_id        uuid NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
    table_sessions_id INT  NOT NULL REFERENCES table_sessions (id) ON DELETE CASCADE,
    user_number       INT  NOT NULL,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (account_id, table_sessions_id)
);

CREATE TABLE public.account_allergies
(
    id          SERIAL PRIMARY KEY,
    account_id  uuid NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
    allergen_id INT  NOT NULL REFERENCES allergens (id) ON DELETE CASCADE,
    UNIQUE (account_id, allergen_id)
);

CREATE TABLE public.menu_category_translations
(
    id               SERIAL PRIMARY KEY,
    menu_category_id INT          NOT NULL REFERENCES menu_categories (id) ON DELETE CASCADE,
    language_code    VARCHAR(10)  NOT NULL,
    name             VARCHAR(255) NOT NULL,
    UNIQUE (menu_category_id, language_code)
);

CREATE TABLE public.ordered_items
(
    id              SERIAL PRIMARY KEY,
    placed_order_id INT NOT NULL REFERENCES placed_orders (id) ON DELETE CASCADE,
    menu_item_id    INT NOT NULL REFERENCES menu_items (id) ON DELETE CASCADE,
    quantity        INT NOT NULL,
    price           INT NOT NULL DEFAULT 0,
    added_by_user   uuid NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

