-- Create instagram_posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS instagram_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  embed_html text NOT NULL,
  caption text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  company text,
  image_url text,
  text text NOT NULL,
  rating integer,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  value jsonb,
  description text,
  category text,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_features table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_features (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Now enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

-- Apply Policies (using DO block to handle 'already exists' errors gracefully if needed, or just dropping first)

-- 1. INSTAGRAM POSTS
DROP POLICY IF EXISTS "Public instagram_posts read access" ON instagram_posts;
DROP POLICY IF EXISTS "Admin instagram_posts all access" ON instagram_posts;

CREATE POLICY "Public instagram_posts read access" ON instagram_posts FOR SELECT USING (true);
CREATE POLICY "Admin instagram_posts all access" ON instagram_posts FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 2. TESTIMONIALS
DROP POLICY IF EXISTS "Public testimonials read access" ON testimonials;
DROP POLICY IF EXISTS "Admin testimonials all access" ON testimonials;

CREATE POLICY "Public testimonials read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admin testimonials all access" ON testimonials FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 3. SETTINGS
DROP POLICY IF EXISTS "Public settings read access" ON settings;
DROP POLICY IF EXISTS "Admin settings all access" ON settings;

CREATE POLICY "Public settings read access" ON settings FOR SELECT USING (true);
CREATE POLICY "Admin settings all access" ON settings FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- 4. PRODUCT FEATURES
DROP POLICY IF EXISTS "Public product_features read access" ON product_features;
DROP POLICY IF EXISTS "Admin product_features all access" ON product_features;

CREATE POLICY "Public product_features read access" ON product_features FOR SELECT USING (true);
CREATE POLICY "Admin product_features all access" ON product_features FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
