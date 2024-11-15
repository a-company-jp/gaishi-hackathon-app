-- Insert sample restaurant
INSERT INTO public.restaurants (hostname, name, address, phone_number)
VALUES ('store1', 'Sample Restaurant', '123 Main Street, Tokyo', '03-1234-5678');

-- Insert sample tables for the restaurant
INSERT INTO public.tables (uuid, restaurant_id, table_number, capacity)
VALUES ('a1111111-1111-1111-1111-111111111111', 1, 'T1', 4),
       ('a2222222-2222-2222-2222-222222222222', 1, 'T2', 2);

-- Insert sample allergens
INSERT INTO public.allergens (id)
VALUES (1),
       (2),
       (3);

-- Insert allergen translations (5 languages: Japanese, English, Chinese, Spanish, French)
-- Peanuts
INSERT INTO public.allergen_translations (allergen_id, language_code, name)
VALUES (1, 'ja', 'ピーナッツ'),
       (1, 'en', 'Peanuts'),
       (1, 'zh', '花生'),
       (1, 'es', 'Cacahuetes'),
       (1, 'fr', 'Arachides');

-- Shellfish
INSERT INTO public.allergen_translations (allergen_id, language_code, name)
VALUES (2, 'ja', '貝類'),
       (2, 'en', 'Shellfish'),
       (2, 'zh', '贝类'),
       (2, 'es', 'Mariscos'),
       (2, 'fr', 'Fruits de mer');

-- Gluten
INSERT INTO public.allergen_translations (allergen_id, language_code, name)
VALUES (3, 'ja', 'グルテン'),
       (3, 'en', 'Gluten'),
       (3, 'zh', '麸质'),
       (3, 'es', 'Gluten'),
       (3, 'fr', 'Gluten');

-- Insert sample menu categories
INSERT INTO public.menu_categories (id, restaurant_id)
VALUES (1, 1),
       (2, 1);

-- Insert menu category translations (5 languages)
-- Appetizers
INSERT INTO public.menu_category_translations (menu_category_id, language_code, name)
VALUES (1, 'ja', '前菜'),
       (1, 'en', 'Appetizers'),
       (1, 'zh', '开胃菜'),
       (1, 'es', 'Aperitivos'),
       (1, 'fr', 'Entrées');

-- Main Courses
INSERT INTO public.menu_category_translations (menu_category_id, language_code, name)
VALUES (2, 'ja', '主菜'),
       (2, 'en', 'Main Courses'),
       (2, 'zh', '主菜'),
       (2, 'es', 'Platos Principales'),
       (2, 'fr', 'Plats Principaux');

-- Insert sample menu items
INSERT INTO public.menu_items (restaurant_id, category_id, price, available)
VALUES (1, 1, 500, TRUE),
       (1, 2, 1500, TRUE),
       (1, 2, 1200, TRUE);

-- Insert menu item translations (5 languages)
-- Spring Rolls
INSERT INTO public.menu_item_translations (menu_item_id, language_code, name, description)
VALUES (1, 'ja', '春巻き', '野菜が詰まったカリカリの春巻き。'),
       (1, 'en', 'Spring Rolls', 'Crispy spring rolls filled with vegetables.'),
       (1, 'zh', '春卷', '酥脆的春卷，内有蔬菜。'),
       (1, 'es', 'Rollitos de Primavera', 'Rollitos de primavera crujientes rellenos de vegetales.'),
       (1, 'fr', 'Rouleaux Printaniers', 'Rouleaux printaniers croustillants remplis de légumes.');

-- Grilled Salmon
INSERT INTO public.menu_item_translations (menu_item_id, language_code, name, description)
VALUES (2, 'ja', 'グリルサーモン', '完璧にグリルされた新鮮なサーモン。'),
       (2, 'en', 'Grilled Salmon', 'Fresh salmon grilled to perfection.'),
       (2, 'zh', '烤三文鱼', '新鲜的三文鱼，完美烤制。'),
       (2, 'es', 'Salmón a la Parrilla', 'Salmón fresco a la parrilla a la perfección.'),
       (2, 'fr', 'Saumon Grillé', 'Saumon frais grillé à la perfection.');

-- Pasta Carbonara
INSERT INTO public.menu_item_translations (menu_item_id, language_code, name, description)
VALUES (3, 'ja', 'カルボナーラパスタ', 'ベーコンとチーズのクリーミーなパスタ。'),
       (3, 'en', 'Pasta Carbonara', 'Creamy pasta with bacon and cheese.'),
       (3, 'zh', '卡邦尼拉意大利面', '配有培根和奶酪的奶油意大利面。'),
       (3, 'es', 'Pasta Carbonara', 'Pasta cremosa con tocino y queso.'),
       (3, 'fr', 'Pâtes Carbonara', 'Pâtes crémeuses avec bacon et fromage.');

-- Insert menu_item_allergens
-- Spring Rolls contains Gluten
INSERT INTO public.menu_item_allergens (menu_item_id, allergen_id)
VALUES (1, 3);

-- Grilled Salmon contains Shellfish
INSERT INTO public.menu_item_allergens (menu_item_id, allergen_id)
VALUES (2, 2);

-- Pasta Carbonara contains Gluten
INSERT INTO public.menu_item_allergens (menu_item_id, allergen_id)
VALUES (3, 3);
