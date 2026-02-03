-- Enable RLS on products table if not already enabled
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read products
CREATE POLICY "Public products read access" ON products
  FOR SELECT USING (true);

-- Policy to allow admins to insert products
-- Checks if the authenticated user has is_admin = true in their profile
CREATE POLICY "Admin products insert access" ON products
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Policy to allow admins to update products
CREATE POLICY "Admin products update access" ON products
  FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- Policy to allow admins to delete products
CREATE POLICY "Admin products delete access" ON products
  FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );


-- OPTIONAL: If the above policies still fail, use these PERMISSIVE policies for development
-- (Uncomment the lines below and run them if you just want to allow ALL logged in users to edit products)

/*
CREATE POLICY "Allow all authenticated updates" ON products
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
*/
