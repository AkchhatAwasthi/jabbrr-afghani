-- Ensure addresses table exists and has correct permissions
-- Run this script to support the Save Address feature

-- 1. Create addresses table if it doesn't exist
CREATE TABLE IF NOT EXISTS addresses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  name text, -- e.g., "Home", "Work", "My Pad"
  address_line_1 text NOT NULL,
  address_line_2 text,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  landmark text,
  type text DEFAULT 'home', -- 'home', 'work', 'other'
  latitude numeric,
  longitude numeric,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- 3. Define Policies (Security Rules)

-- Allow users to view their own addresses
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
CREATE POLICY "Users can view own addresses" 
ON addresses FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to add new addresses
DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
CREATE POLICY "Users can insert own addresses" 
ON addresses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own addresses
DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
CREATE POLICY "Users can update own addresses" 
ON addresses FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete their own addresses
DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
CREATE POLICY "Users can delete own addresses" 
ON addresses FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Ensure 'phone' column exists in profiles (for the auto-update feature)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone') THEN
        ALTER TABLE profiles ADD COLUMN phone text;
    END IF;
END $$;
