-- EMERGENCY FIX for "Infinite Recursion" error in RLS policies
-- Run this immediately to restore access

-- 1. Drop the problematic recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- 2. Create a "Security Definer" function to safely check Admin status
-- This function runs with "superuser" privileges, allowing it to check the profiles table
-- without triggering the RLS checks again (breaking the infinite loop).
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Re-apply the Policies using the safe function

-- Allow users to see their own profile (Always allowed)
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Allow Admins to see ALL profiles (Uses the safe is_admin() function)
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR SELECT 
TO authenticated 
USING (is_admin());

-- Allow Admins to update ALL profiles
CREATE POLICY "Admins can update all profiles" 
ON profiles FOR UPDATE 
TO authenticated 
USING (is_admin());

-- Allow users to insert their own profile on signup
CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);
