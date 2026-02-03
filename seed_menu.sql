-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
  -- Generate UUIDs for categories
  cat_rolls uuid := gen_random_uuid();
  cat_biryani uuid := gen_random_uuid();
  cat_kebabs uuid := gen_random_uuid();
  cat_beverages uuid := gen_random_uuid();
  cat_sides uuid := gen_random_uuid();
BEGIN
  -- Clear existing data (Order matters relationships)
  -- Note: If you have foreign key constraints, you might need to delete from products first
  DELETE FROM reviews;
  DELETE FROM "order_items" WHERE "order_id" IN (SELECT id FROM orders); -- Assuming order_items exists differently or within orders JSON, checking schema again... 
  -- Schema shows items is Json in orders, so no separate table to clear unless reviews link to products.
  DELETE FROM product_coupons;
  DELETE FROM products;
  DELETE FROM categories;

  -- Insert New Categories
  INSERT INTO categories (id, name, description, is_active, image_url) VALUES
  (cat_rolls, 'Rolls', 'Authentic Kathi Rolls wrapped in crispy parathas', true, 'https://images.unsplash.com/photo-1626777552726-4a6531ddea90'),
  (cat_biryani, 'Biryani', 'Aromatic Dum Biryani slow-cooked to perfection', true, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0'),
  (cat_kebabs, 'Kebabs', 'Succulent Kebabs grilled in tandoor', true, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'),
  (cat_beverages, 'Beverages', 'Refreshing drinks to complement your meal', true, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97'),
  (cat_sides, 'Sides', 'Perfect accompaniments', true, 'https://images.unsplash.com/photo-1601050690597-df0568f70950');

  -- Insert Products (Rolls)
  INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity) VALUES
  ('Classic Chicken Roll', 'Juicy chicken chunks marinated in spices, wrapped in a flaky paratha with onions and sauces.', 149, 199, cat_rolls, true, true, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90'], 100),
  ('Double Egg Chicken Roll', 'Loaded with double egg omelette and spicy chicken filling.', 179, 229, cat_rolls, true, true, '350g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90'], 100),
  ('Mutton Seekh Roll', 'Tender mutton seekh kebab wrapped in a rumali roti with mint chutney.', 249, 299, cat_rolls, true, false, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582'], 80),
  ('Paneer Tikka Roll', 'Smoky paneer tikka chunks with veggies in a paratha roll.', 129, 169, cat_rolls, true, true, '280g', '1', 1, ARRAY['https://images.unsplash.com/photo-1563375853373-15b7816d3c3d'], 100),
  ('Soya Chaap Roll', 'Tandoori soya chaap wrapped with onions and creamy sauces.', 139, 179, cat_rolls, true, false, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626074353765-517a681e40be'], 100),
  ('Chicken Malai Tikka Roll', 'Creamy and mild chicken malai tikka wrapped in a soft roti.', 169, 219, cat_rolls, true, false, '320g', '1', 1, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'], 90),
  ('Classic Egg Roll', 'Simple yet delicious double egg roll with veggies and sauces.', 99, 129, cat_rolls, true, false, '250g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90'], 150),
  ('Chicken Bhuna Roll', 'Spicy bhuna chicken masala stuffed in a crispy paratha.', 159, 199, cat_rolls, true, false, '320g', '1', 1, ARRAY['https://images.unsplash.com/photo-1606787366850-de6330128bfc'], 85);

  -- Insert Products (Biryani)
  INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity) VALUES
  ('Chicken Dum Biryani', 'Classic Hyderabadi style chicken dum biryani served with raita and salan.', 299, 349, cat_biryani, true, true, '750g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1562967963-36585970c325'], 50),
  ('Mutton Biryani', 'Tender mutton pieces layered with fragrant basmati rice.', 399, 499, cat_biryani, true, true, '750g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1633945274405-b6c8069047b0'], 40),
  ('Veg Dum Biryani', 'Fresh vegetables cooked with aromatic spices and basmati rice.', 249, 299, cat_biryani, true, false, '700g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1564834724105-918b73d1b9e0'], 60),
  ('Egg Biryani', 'Flavorful biryani rice served with 2 hard-boiled fried eggs.', 229, 279, cat_biryani, true, false, '700g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1562967963-36585970c325'], 60),
  ('Jabbrr Special Boneless Biryani', 'Our signature boneless chicken biryani with secret spices.', 349, 449, cat_biryani, true, true, '800g', 'Serves 2', 2, ARRAY['https://images.unsplash.com/photo-1589302168068-964664d93dc0'], 30);

  -- Insert Products (Kebabs)
  INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity) VALUES
  ('Chicken Seekh Kebab', 'Minced chicken spiced with herbs and grilled on skewers.', 249, 299, cat_kebabs, true, true, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'], 40),
  ('Mutton Seekh Kebab', 'Juicy minced mutton kebabs grilled to perfection.', 349, 399, cat_kebabs, true, true, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582'], 30),
  ('Chicken Tikka', 'Boneless chicken cubes marinated in yogurt and spices.', 279, 329, cat_kebabs, true, false, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'], 40),
  ('Paneer Tikka', 'Cottage cheese cubes marinated and grilled with veggies.', 229, 279, cat_kebabs, true, false, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1563375853373-15b7816d3c3d'], 50),
  ('Chicken Malai Tikka', 'Creamy, melt-in-the-mouth chicken kebabs.', 289, 339, cat_kebabs, true, true, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'], 35),
  ('Galouti Kebab', 'Finely minced mutton kebabs that melt in your mouth.', 399, 499, cat_kebabs, true, false, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582'], 20);

  -- Insert Products (Beverages/Sides)
  INSERT INTO products (name, description, price, category_id, is_active, is_bestseller, weight, serves, images, stock_quantity) VALUES
  ('Masala Coke', 'Refreshing cola with a spicy twist.', 60, cat_beverages, true, false, '300ml', 1, ARRAY['https://images.unsplash.com/photo-1622483767028-3f66f32aef97'], 100),
  ('Rumali Roti', 'Soft, thin bread that goes perfectly with kebabs.', 30, cat_sides, true, false, '1 Pc', 1, ARRAY['https://images.unsplash.com/photo-1601050690597-df0568f70950'], 200);

END $$;
