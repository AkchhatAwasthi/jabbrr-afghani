-- Seed Settings Table
INSERT INTO settings (key, value, description, category, is_public) VALUES
('tax_rate', '5', 'Tax rate in percentage', 'business', true),
('delivery_charge', '50', 'Standard delivery charge', 'business', true),
('free_delivery_threshold', '500', 'Minimum amount for free delivery', 'business', true),
('cod_charge', '30', 'Extra charge for Cash on Delivery', 'business', true),
('cod_threshold', '2000', 'Maximum order amount for COD', 'business', true),
('min_order_amount', '300', 'Minimum order amount required to checkout', 'business', true),
('max_order_amount', '10000', 'Maximum order amount allowed', 'business', true),
('bulk_discount_threshold', '5000', 'Amount to trigger bulk discount', 'business', true),
('bulk_discount_percentage', '10', 'Percentage off for bulk orders', 'business', true),
('delivery_time_estimate', '"30-45 mins"', 'Estimated time for delivery', 'business', true),
('currency_symbol', '"₹"', 'Currency symbol to display', 'display', true),
('cod_enabled', 'true', 'Enable Cash on Delivery', 'features', true),
('razorpay_enabled', 'false', 'Enable Razorpay payments', 'features', true),
('upi_enabled', 'false', 'Enable UPI payments', 'features', true),
('card_enabled', 'false', 'Enable Card payments', 'features', true),
('netbanking_enabled', 'false', 'Enable Netbanking', 'features', true),
('store_name', '"Jabbrr Afghani"', 'Name of the store', 'store', true),
('store_phone', '"+91 9999999999"', 'Contact phone number', 'store', true),
('store_email', '"contact@jabbrrafghani.com"', 'Contact email', 'store', true),
('store_address', '"Shop 4, Ground Floor, Ashiana Village Center, Vasundhara, Ghaziabad"', 'Store address', 'store', true),
('store_pincode', '"201016"', 'Store pincode', 'store', true),
('business_hours_start', '"11:00"', 'Opening time', 'store', true),
('business_hours_end', '"23:00"', 'Closing time', 'store', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Ensure RLS is enabled and correct (already done but safe to repeat)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read access
DROP POLICY IF EXISTS "Public settings read access" ON settings;
CREATE POLICY "Public settings read access" ON settings FOR SELECT USING (true);

-- Admin write access
DROP POLICY IF EXISTS "Admin settings all access" ON settings;
CREATE POLICY "Admin settings all access" ON settings FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
