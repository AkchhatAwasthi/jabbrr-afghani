-- Fix for missing columns in orders table
-- Run this script in your Supabase SQL Editor

-- 1. Add coupon_code if it's missing (Primary Cause of Error)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'coupon_code') THEN
        ALTER TABLE orders ADD COLUMN coupon_code text;
    END IF;
END $$;

-- 2. Add other potential missing columns just to be safe
DO $$
BEGIN
    -- payment_status
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'payment_status') THEN
        ALTER TABLE orders ADD COLUMN payment_status text DEFAULT 'pending';
    END IF;

    -- order_status
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'order_status') THEN
        ALTER TABLE orders ADD COLUMN order_status text DEFAULT 'pending';
    END IF;
    
    -- razorpay fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'razorpay_order_id') THEN
        ALTER TABLE orders ADD COLUMN razorpay_order_id text;
    END IF;
    
     IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'razorpay_payment_id') THEN
        ALTER TABLE orders ADD COLUMN razorpay_payment_id text;
    END IF;
END $$;

-- 3. Ensure 'coupons' table exists (since the code tries to update it)
CREATE TABLE IF NOT EXISTS coupons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  discount_type text NOT NULL, -- 'percentage' or 'fixed'
  discount_value numeric NOT NULL,
  min_order_amount numeric DEFAULT 0,
  max_discount_amount numeric,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  used_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for coupons
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow public read of active coupons
DROP POLICY IF EXISTS "Public can read active coupons" ON coupons;
CREATE POLICY "Public can read active coupons" 
ON coupons FOR SELECT 
USING (is_active = true);

-- Allow authenticated/public update (for incrementing usage) - Ideally this is server-side only, but for client-side app:
DROP POLICY IF EXISTS "Public can update coupon usage" ON coupons;
CREATE POLICY "Public can update coupon usage" 
ON coupons FOR UPDATE
USING (true)
WITH CHECK (true);
