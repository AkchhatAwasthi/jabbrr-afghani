# Backend Schema & Flow Documentation

## 1. Application Flow

The Supabase backend serves as the source of truth for Products, Orders, Settings, and User Authentication.

### **Checkout & Order Flow**
1.  **Cart**: Managed locally on the client (`useStore` / Zustand).
2.  **Checkout Initialization**:
    *   App fetches `settings` from Supabase (min order amount, delivery charges, COD availability).
    *   User enters address & contact info.
3.  **Place Order**:
    *   **Validated**: Checks min order, COD limits, and address completeness.
    *   **Payment**:
        *   **COD**: Order is inserted immediately into `orders` table with status `pending`.
        *   **Online**: Razorpay transaction is initiated. On success, order is inserted into `orders` with status `paid`.
    *   **Database Record**: A new row is created in the `orders` table containing the customer info, cart items (snapshot), and payment details.
    *   **Confirmation**: User is redirected to success page/profile.

---

## 2. Database Schema

### **1. Table: `orders`**
Stores all customer orders.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key |
| `order_number` | `text` | Unique ID (e.g., SS1702...) |
| `user_id` | `uuid` | Link to `auth.users` (nullable for guest) |
| `customer_info` | `jsonb` | Name, Phone, Email |
| `delivery_location` | `jsonb` | Address string, Estimated time |
| `address_details` | `jsonb` | Structured address (street, city...) |
| `items` | `jsonb` | Snapshot of cart items at purchase |
| `subtotal` | `numeric` | Amount before fees |
| `tax` | `numeric` | Tax amount |
| `delivery_fee` | `numeric` | Shipping cost |
| `cod_fee` | `numeric` | Fee for Cash on Delivery |
| `discount` | `numeric` | Coupon discount amount |
| `total` | `numeric` | Final payable amount |
| `payment_method` | `text` | 'cod' or 'online' |
| `payment_status` | `text` | 'pending', 'paid', 'failed' |
| `order_status` | `text` | 'pending', 'confirmed', 'delivered' |
| `coupon_code` | `text` | Code applied (if any) |
| `razorpay_order_id`| `text` | External Payment ID |
| `created_at` | `timestamptz`| Timestamp |

### **2. Table: `settings`**
Controls global app configuration dynamically without code changes.

| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | `text` | Unique setting name (e.g., `tax_rate`) |
| `value` | `jsonb` | The value (e.g., `5`, `true`) |
| `category` | `text` | business, store, features |
| `is_public` | `boolean` | Accessible to frontend? |

**Key Settings:**
*   `min_order_amount`: Minimum cart value.
*   `cod_enabled`: Master switch for COD.
*   `cod_threshold`: Max value for COD orders.
*   `delivery_charge` / `free_delivery_threshold`.

### **3. Table: `coupons`**
Manages discount codes.

| Column | Type | Description |
| :--- | :--- | :--- |
| `code` | `text` | The promo code (e.g., WELCOME10) |
| `discount_type` | `text` | 'percentage' or 'fixed' |
| `discount_value` | `text` | Amount off |
| `is_active` | `boolean` | Is valid? |

### **4. Table: `products` (Standard Supabase Table)**
*   `sku` (PK), `name`, `price`, `image`, `category`, `description`.

### **5. Table: `categories`**
*   `id`, `name`, `image`, `is_active`.

---

## 3. Security (RLS Policies)

*   **Public Access**: Can **INSERT** into `orders` (for Guest Checkout). Can **READ** `products`, `categories`, and public `settings`.
*   **Authenticated Users**: Can **READ** own `orders`.
*   **Admins**: Can **READ/WRITE** ALL tables.
