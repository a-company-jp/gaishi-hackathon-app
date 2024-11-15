-- Remove menu_item_allergens entries
DELETE FROM public.menu_item_allergens
WHERE menu_item_id IN (1, 2, 3);

-- Remove menu_item_translations entries
DELETE FROM public.menu_item_translations
WHERE menu_item_id IN (1, 2, 3);

-- Remove menu_items entries
DELETE FROM public.menu_items
WHERE restaurant_id = 1;

-- Remove menu_category_translations entries
DELETE FROM public.menu_category_translations
WHERE menu_category_id IN (1, 2);

-- Remove menu_categories entries
DELETE FROM public.menu_categories
WHERE restaurant_id = 1;

-- Remove allergen_translations entries
DELETE FROM public.allergen_translations
WHERE allergen_id IN (1, 2, 3);

-- Remove allergens entries
DELETE FROM public.allergens
WHERE id IN (1, 2, 3);

-- Remove tables entries
DELETE FROM public.tables
WHERE uuid IN ('a1111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222');

-- Remove restaurant entry
DELETE FROM public.restaurants
WHERE hostname = 'store1';
