-- Enable RLS on categories table
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Remove valid policies to ensure a clean slate
DROP POLICY IF EXISTS "Public categories read access" ON categories;
DROP POLICY IF EXISTS "Admin categories insert access" ON categories;
DROP POLICY IF EXISTS "Admin categories update access" ON categories;
DROP POLICY IF EXISTS "Admin categories delete access" ON categories;
DROP POLICY IF EXISTS "Admin categories all access" ON categories;

-- 1. Allow everyone to read active categories (for the menu)
CREATE POLICY "Public categories read access" ON categories
  FOR SELECT USING (true);

-- 2. Allow Admins to INSERT (Add) new categories
CREATE POLICY "Admin categories insert access" ON categories
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- 3. Allow Admins to UPDATE (Edit) categories
CREATE POLICY "Admin categories update access" ON categories
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- 4. Allow Admins to DELETE categories
CREATE POLICY "Admin categories delete access" ON categories
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );
