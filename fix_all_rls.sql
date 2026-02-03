-- Enable RLS on admin-managed tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

-- 1. CATEGORIES POLICIES
-- Everyone can read active categories
CREATE POLICY "Public categories read access" ON categories
  FOR SELECT USING (true);

-- Admins can do everything with categories
CREATE POLICY "Admin categories insert access" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admin categories update access" ON categories
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admin categories delete access" ON categories
  FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 2. COUPONS POLICIES
-- Everyone can read coupons (to apply them)
CREATE POLICY "Public coupons read access" ON coupons
  FOR SELECT USING (true);

-- Admins can manage coupons
CREATE POLICY "Admin coupons all access" ON coupons
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 3. SETTINGS POLICIES
-- Public read access for global settings
CREATE POLICY "Public settings read access" ON settings
  FOR SELECT USING (true);

-- Admins manage settings
CREATE POLICY "Admin settings all access" ON settings
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 4. TESTIMONIALS & POSTS
CREATE POLICY "Public testimonials read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admin testimonials all access" ON testimonials FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Public instagram_posts read access" ON instagram_posts FOR SELECT USING (true);
CREATE POLICY "Admin instagram_posts all access" ON instagram_posts FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Public product_features read access" ON product_features FOR SELECT USING (true);
CREATE POLICY "Admin product_features all access" ON product_features FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 5. ORDERS (Special case: Users see their own, Admins see all)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users see their own orders
CREATE POLICY "Users see own orders" ON orders
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- Admins see ALL orders
CREATE POLICY "Admins see all orders" ON orders
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Admins can update orders
CREATE POLICY "Admins update all orders" ON orders
  FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
