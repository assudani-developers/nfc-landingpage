# TapTap NFC | Smart Shop Card & Review Portal 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A premium, light-themed contactless **NFC & QR Code Digital Business Card platform** for retail stores, cafes, salons, clinics, and businesses. When customers tap an NFC card or scan an acrylic QR standee at the billing counter, their phone instantly opens a bespoke mobile landing page with high-conversion 5-star Google review triggers, WhatsApp chat, Instagram follow, and direct maps navigation.

---

## ✨ Features

- **📱 Light-Themed Apple-Grade UI:**
  - Full-width storefront cover banner with organic curved wave cut.
  - Floating rounded square shop logo with depth and subtle elevation.
  - Authentic official local SVG brand icons (Google Reviews, Instagram, Facebook, WhatsApp, Website).
  - Quick celebratory confetti burst on 5-star Google review tap.
  - Customizable main action button (e.g. *Visit Our Shop*, *Order Online*, *Book Appointment*).

- **🔐 Central Admin Dashboard:**
  - Dedicated admin portal with secure credentials authentication.
  - Add, edit, and manage unlimited shops.
  - **Custom Unique URL for Every Shop:** Each business gets its dedicated slug (e.g., `domain.com/your-shop`).
  - **1-Click Copy NFC URL:** Easily copy the full destination URL to write directly to physical NFC tags with NFC Tools.
  - **QR Code Standee Generator:** Generates high-resolution, print-ready QR standees with business branding.

- **🎯 Strict Link Limits (1 to 5 Links):**
  - **Mandatory Link:** Google Reviews is always required (primary review conversion button).
  - **Maximum 5 Links:** Keeps the mobile screen clean and high-converting.
  - **Zero Placeholders:** Only admin-configured links are shown.

- **🗄️ Firebase Firestore Integration:**
  - Live Firestore cloud sync for shops, custom links, themes, and contactless tap analytics.
  - Base64 direct image storage inside documents for fast, reliable loading.
  - Graceful fallback with LocalStorage and memory cache so everything runs seamlessly in all environments.

- **💼 Developer Referral Section:**
  - Discreet, elegant developer referral leading to `/services`.
  - Portfolio highlights for **Piyush Assudani** (*Web, Mobile App & Software Developer*).
  - Direct referral to **[piyushassudani.in](https://piyushassudani.in)** with WhatsApp order links.
  - Can be toggled on or off per shop in the admin panel.

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/assudani-developers/nfc-landingpage.git
cd nfc-landingpage
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Admin Authentication
ADMIN_DEFAULT_USER=admin
ADMIN_DEFAULT_PASSWORD=your_secure_password
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Routes Overview

| Route | Description |
|---|---|
| `/` | Live showcase shop page |
| `/[slug]` | Dedicated dynamic shop page (e.g. `/urban-cafe`, `/studio-piyush`) |
| `/services` | Piyush Assudani portfolio & web development services referral page |

---

## 📱 How to Write to Physical NFC Tags

1. Install the free **NFC Tools** app from the App Store or Google Play Store.
2. In the Admin Panel, click **"Copy URL"** next to the desired shop.
3. Open **NFC Tools** &rarr; Tap **Write** &rarr; **Add a record** &rarr; **URL / URI**.
4. Paste the copied shop link (e.g. `https://yourdomain.com/your-shop`).
5. Tap **Write** and hold your smartphone over the NFC card, sticker, or acrylic standee.
6. Done! Any smartphone tapping the tag will instantly launch the shop page.

---

## 👨‍💻 Author & Credits

Designed & Developed by **Piyush Assudani**  
**Assudani Developer** — Web, Mobile App & Software Development  
🌐 **Website:** [piyushassudani.in](https://piyushassudani.in)

---

## 📄 License

This project is licensed under the MIT License.
