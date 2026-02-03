-- Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- clear existing data
-- Commented out to prevent errors if tables don't exist. 
-- If you have foreign key constraints, you might need to manually clear these tables first:
-- DELETE FROM reviews;
-- DELETE FROM product_coupons;

DELETE FROM products;
DELETE FROM categories;

-- Insert Rolls Category and Products
WITH new_cat AS (
  INSERT INTO categories (name, description, is_active, image_url) 
  VALUES ('Rolls', 'Authentic Kathi Rolls wrapped in crispy parathas', true, 'https://images.unsplash.com/photo-1626777552726-4a6531ddea90')
  RETURNING id
)
INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity)
SELECT 
  name, description, price, original_price, (SELECT id FROM new_cat), is_active, is_bestseller, weight, pieces, serves, images, stock_quantity
FROM (VALUES
  ('Classic Chicken Roll', 'Juicy chicken chunks marinated in spices, wrapped in a flaky paratha with onions and sauces.', 149, 199, true, true, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90']::text[], 100),
  ('Double Egg Chicken Roll', 'Loaded with double egg omelette and spicy chicken filling.', 179, 229, true, true, '350g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90']::text[], 100),
  ('Mutton Seekh Roll', 'Tender mutton seekh kebab wrapped in a rumali roti with mint chutney.', 249, 299, true, false, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582']::text[], 80),
  ('Paneer Tikka Roll', 'Smoky paneer tikka chunks with veggies in a paratha roll.', 129, 169, true, true, '280g', '1', 1, ARRAY['https://images.unsplash.com/photo-1563375853373-15b7816d3c3d']::text[], 100),
  ('Soya Chaap Roll', 'Tandoori soya chaap wrapped with onions and creamy sauces.', 139, 179, true, false, '300g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626074353765-517a681e40be']::text[], 100),
  ('Chicken Malai Tikka Roll', 'Creamy and mild chicken malai tikka wrapped in a soft roti.', 169, 219, true, false, '320g', '1', 1, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0']::text[], 90),
  ('Classic Egg Roll', 'Simple yet delicious double egg roll with veggies and sauces.', 99, 129, true, false, '250g', '1', 1, ARRAY['https://images.unsplash.com/photo-1626777552726-4a6531ddea90']::text[], 150),
  ('Chicken Bhuna Roll', 'Spicy bhuna chicken masala stuffed in a crispy paratha.', 159, 199, true, false, '320g', '1', 1, ARRAY['https://images.unsplash.com/photo-1606787366850-de6330128bfc']::text[], 85)
) AS t(name, description, price, original_price, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity);

-- Insert Biryani Category and Products
WITH new_cat AS (
  INSERT INTO categories (name, description, is_active, image_url) 
  VALUES ('Biryani', 'Aromatic Dum Biryani slow-cooked to perfection', true, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0')
  RETURNING id
)
INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity)
SELECT 
  name, description, price, original_price, (SELECT id FROM new_cat), is_active, is_bestseller, weight, pieces, serves, images, stock_quantity
FROM (VALUES
  ('Chicken Dum Biryani', 'Classic Hyderabadi style chicken dum biryani served with raita and salan.', 299, 349, true, true, '750g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1562967963-36585970c325']::text[], 50),
  ('Mutton Biryani', 'Tender mutton pieces layered with fragrant basmati rice.', 399, 499, true, true, '750g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1633945274405-b6c8069047b0']::text[], 40),
  ('Veg Dum Biryani', 'Fresh vegetables cooked with aromatic spices and basmati rice.', 249, 299, true, false, '700g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1564834724105-918b73d1b9e0']::text[], 60),
  ('Egg Biryani', 'Flavorful biryani rice served with 2 hard-boiled fried eggs.', 229, 279, true, false, '700g', 'Serves 1-2', 2, ARRAY['https://images.unsplash.com/photo-1562967963-36585970c325']::text[], 60),
  ('Jabbrr Special Boneless Biryani', 'Our signature boneless chicken biryani with secret spices.', 349, 449, true, true, '800g', 'Serves 2', 2, ARRAY['https://images.unsplash.com/photo-1589302168068-964664d93dc0']::text[], 30)
) AS t(name, description, price, original_price, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity);


-- Insert Kebabs Category and Products
WITH new_cat AS (
  INSERT INTO categories (name, description, is_active, image_url) 
  VALUES ('Kebabs', 'Succulent Kebabs grilled in tandoor', true, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0')
  RETURNING id
)
INSERT INTO products (name, description, price, original_price, category_id, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity)
SELECT 
  name, description, price, original_price, (SELECT id FROM new_cat), is_active, is_bestseller, weight, pieces, serves, images, stock_quantity
FROM (VALUES
  ('Chicken Seekh Kebab', 'Minced chicken spiced with herbs and grilled on skewers.', 249, 299, true, true, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0']::text[], 40),
  ('Mutton Seekh Kebab', 'Juicy minced mutton kebabs grilled to perfection.', 349, 399, true, true, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582']::text[], 30),
  ('Chicken Tikka', 'Boneless chicken cubes marinated in yogurt and spices.', 279, 329, true, false, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0']::text[], 40),
  ('Paneer Tikka', 'Cottage cheese cubes marinated and grilled with veggies.', 229, 279, true, false, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1563375853373-15b7816d3c3d']::text[], 50),
  ('Chicken Malai Tikka', 'Creamy, melt-in-the-mouth chicken kebabs.', 289, 339, true, true, '300g', '6 Pcs', 2, ARRAY['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0']::text[], 35),
  ('Galouti Kebab', 'Finely minced mutton kebabs that melt in your mouth.', 399, 499, true, false, '250g', '4 Pcs', 1, ARRAY['https://images.unsplash.com/photo-1603360946369-dc9bb6f58582']::text[], 20)
) AS t(name, description, price, original_price, is_active, is_bestseller, weight, pieces, serves, images, stock_quantity);


-- Insert Beverages Category and Products
WITH new_cat AS (
  INSERT INTO categories (name, description, is_active, image_url) 
  VALUES ('Beverages', 'Refreshing drinks to complement your meal', true, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97')
  RETURNING id
)
INSERT INTO products (name, description, price, category_id, is_active, is_bestseller, weight, serves, images, stock_quantity)
SELECT 
  name, description, price, (SELECT id FROM new_cat), is_active, is_bestseller, weight, serves, images, stock_quantity
FROM (VALUES
  ('Masala Coke', 'Refreshing cola with a spicy twist.', 60, true, false, '300ml', 1, ARRAY['https://images.unsplash.com/photo-1622483767028-3f66f32aef97']::text[], 100)
) AS t(name, description, price, is_active, is_bestseller, weight, serves, images, stock_quantity);


-- Insert Sides Category and Products
WITH new_cat AS (
  INSERT INTO categories (name, description, is_active, image_url) 
  VALUES ('Sides', 'Perfect accompaniments', true, 'https://images.unsplash.com/photo-1601050690597-df0568f70950')
  RETURNING id
)
INSERT INTO products (name, description, price, category_id, is_active, is_bestseller, weight, serves, images, stock_quantity)
SELECT 
  name, description, price, (SELECT id FROM new_cat), is_active, is_bestseller, weight, serves, images, stock_quantity
FROM (VALUES
  ('Rumali Roti', 'Soft, thin bread that goes perfectly with kebabs.', 30, true, false, '1 Pc', 1, ARRAY['https://images.unsplash.com/photo-1601050690597-df0568f70950']::text[], 200)
) AS t(name, description, price, is_active, is_bestseller, weight, serves, images, stock_quantity);
