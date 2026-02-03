-- Create the orders table properly with all necessary constraints and RLS

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number text NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id),
  
  -- Customer Info (JSONB is flexible)
  customer_info jsonb NOT NULL, 
  
  -- Addresses (JSONB for flexibility)
  delivery_location jsonb NOT NULL,
  address_details jsonb NOT NULL,
  
  -- Line Items (Stores snapshot of items at time of purchase)
  items jsonb NOT NULL,
  
  -- Financials
  subtotal numeric NOT NULL,
  tax numeric NOT NULL DEFAULT 0,
  delivery_fee numeric NOT NULL DEFAULT 0,
  cod_fee numeric DEFAULT 0,
  discount numeric DEFAULT 0,
  total numeric NOT NULL,
  
  -- Status & Payment
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
  order_status text DEFAULT 'pending',   -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
  
  -- External IDs
  razorpay_order_id text,
  razorpay_payment_id text,
  coupon_code text,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" 
ON orders FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Policy 2: Admins can view all orders
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
CREATE POLICY "Admins can view all orders" 
ON orders FOR ALL 
TO authenticated 
USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- Policy 3: Users/Guests can create orders (INSERT)
-- Important: For guest checkout (user_id is null), we need to allow public insert
-- But ideally, you restrict this. A common pattern for guest checkout is allowing public INSERT
-- but restricting SELECT/UPDATE to only admins or the user who created it (via session, though difficult with stateless JWT).
-- For simplicity in this app:
DROP POLICY IF EXISTS "Public can create orders" ON orders;
CREATE POLICY "Public can create orders" 
ON orders FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy 4: Users can create their own orders (Authenticated)
DROP POLICY IF EXISTS "Authenticated users create orders" ON orders;
CREATE POLICY "Authenticated users create orders" 
ON orders FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);
