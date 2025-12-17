# 🛒 NeonCart

NeonCart is a modern e-commerce web application built using **Next.js (App Router)** and **Supabase**.
It implements a complete shopping flow including product browsing, cart management, checkout, and order history.

This project focuses on real-world patterns such as authentication, Row Level Security (RLS), and clean state management.

---

## ✨ Features

### 🔐 Authentication

- Email & password authentication using Supabase
- Protected routes (cart, checkout, orders, wishlist)
- Logged-in users cannot access login or signup pages
- Session-aware UI using React Context

### 🛍️ Products

- Product listing page with responsive cards
- Individual product detail pages
- Wishlist support
- Add to cart from product cards and product detail pages

### 🛒 Cart

- Add and remove items
- Increase or decrease quantity
- Real-time price calculation
- Empty cart state handled properly

### ❤️ Wishlist

- Add or remove products
- Wishlist page with saved products
- Clean empty wishlist UI

### 🚚 Checkout Flow

Three-step checkout process:

1. Address
2. Order summary
3. Confirm order

- Step-based navigation using context
- Users cannot skip steps
- Clear price breakdown before placing the order

### 💰 Pricing Logic

- Subtotal calculation
- Tax calculation
- Discount and coupon support
- Final payable amount stored securely in the database

### 📦 Orders

- Place orders securely
- View list of previous orders
- Order detail page with purchased items and price breakdown
- Orders are user-specific using Supabase RLS

---

## 🧭 Routes

Public Routes:
/
/products
/products/[id]
/login
/signup

Protected Routes:
/cart
/checkout/address
/checkout/confirm
/orders
/orders/[id]
/wishlist

---

## 🧱 Tech Stack

- Next.js 14 (App Router)
- React
- Supabase (Auth, Database, RLS)
- Tailwind CSS
- Context API

---

## 🗄️ Database Structure

Orders:

- id
- user_id
- subtotal_amount
- tax_amount
- discount_amount
- coupon_discount
- coupon_code
- final_amount
- status
- created_at

Order Items:

- id
- order_id
- product_id
- name
- price
- quantity

---

## 🔐 Security

- RLS enabled on all user-related tables
- Frontend does not manually filter by user_id
- Supabase handles authorization using auth.uid()

---

## 🚀 Getting Started

1. Clone repository
   git clone https://github.com/your-username/neoncart.git

2. Install dependencies
   npm install

3. Environment variables (.env.local)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run app
   npm run dev

---

## 👨‍💻 Author

Built by Krishna
