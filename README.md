# ⚡ EXE DIGITAL WORLD - Premium Digital Products E-Commerce Platform

> **TAGLINE:** *"Your Digital World, All in One Place"*  
> **Tech Stack:** React 18, Vite, Tailwind CSS, Lucide Icons, Meta Pixel Telemetry, Modular Payment Adapter.

---

## 🌟 Key Features

- **Luxury Digital-Tech Theme**: Dark slate aesthetic (`#05070D`), electric cyan (`#00F0FF`), royal purple (`#8B5CF6`), and gold accents.
- **Conversion-Optimized Storefront**: Mobile-first design with sticky checkout CTAs, product specifications, customer reviews with Verified Purchase badges, and FAQ accordions.
- **Interactive 9:16 iPhone 13 Video Previews**: 4 playable vertical HD Reel videos loaded inside realistic CSS iPhone mockups.
- **Meta Ads Landing Pages System (`/offer/:slug` & `/product/:slug`)**: Custom landing page builder supporting Single Product, 2-Products Offer, 4-Products Offer, and All-Products Vault presets with instant 1-click **Copy Live Link** for Meta Ads.
- **Meta Pixel Telemetry**: Native tracking for `ViewContent`, `AddToCart`, `InitiateCheckout`, and `Purchase` events in Indian Rupees (`INR` / `₹`).
- **Indian Rupee (₹) Pricing**: Native Indian number formatting (`₹149`, `₹299`, `₹1,999`, `₹12,999`).
- **Secure Admin Panel (`/admin`)**: Analytics Overview (Revenue starting at `₹0`, sales charts, AOV, net profit), Product Manager, Meta Ads Landing Page Generator, Reviews Moderation, and Orders Log.

---

## 🛠️ Project Setup & Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/exe-digital-world.git
cd exe-digital-world
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001) in your browser.

### 3. Admin Authentication
- Visit `/admin` or click the **Admin** button in the header.
- Passkey: `admin123` (Configurable via `.env`).

---

## 🚀 Production Build

To test and compile the production bundle:
```bash
npm run build
```
Output files will be generated in `dist/`.

---

## 🌐 Deploying to Vercel (Free Hosting)

This repository is pre-configured for instant **Vercel** deployment with single-page application (SPA) routing via `vercel.json`.

### Steps for Vercel Deployment:
1. Push this project code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your GitHub repository `exe-digital-world`.
4. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. *(Optional)* Add Environment Variables under Project Settings.
6. Click **Deploy**. Vercel will build the project and provide a live HTTPS URL (e.g. `https://exe-digital-world.vercel.app`).

---

## 🔑 Environment Variables Documentation

Copy `.env.example` to `.env` to configure optional environment variables:

| Environment Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_APP_TITLE` | App Title | `EXE DIGITAL WORLD` |
| `VITE_CURRENCY` | Storefront Currency | `INR` |
| `VITE_ADMIN_PASSKEY` | Admin Passkey | `admin123` |
| `VITE_META_PIXEL_ID` | Meta Ads Pixel ID | `123456789012345` |
| `VITE_PAYMENT_GATEWAY_URL` | Live Payment API Endpoint | `https://api.razorpay.com/v1/orders` |
| `VITE_PAYMENT_API_KEY` | Payment API Key | `rzp_live_xxx` |
| `VITE_PAYMENT_WEBHOOK_URL` | Webhook URL | `https://your-domain.vercel.app/api/webhook` |

---

## ⚙️ Connecting Live Payment Gateway Later

The payment architecture in `src/services/paymentService.js` is modularly structured so you can connect live payment processors (Razorpay, PhonePe, Stripe, Cashfree) after deployment:

1. Obtain your API Key & Secret from your payment gateway dashboard (e.g. Razorpay / PhonePe).
2. Set `VITE_PAYMENT_GATEWAY_URL` and `VITE_PAYMENT_API_KEY` in Vercel Environment Variables.
3. Configure the Webhook URL in your payment dashboard to point to your Vercel endpoint.

---

## 📜 License & Copyright

© EXE DIGITAL WORLD. All Rights Reserved.
