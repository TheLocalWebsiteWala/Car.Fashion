# 🚗 Car Fashion — Expert Automotive Workshop Website

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![SEO Ready](https://img.shields.io/badge/SEO-JSON--LD%20%26%20Schema.org-00C7B7?style=for-the-badge)](https://schema.org/AutoRepair)
[![Responsive](https://img.shields.io/badge/Design-Mobile--First%20%26%20Dark%20Theme-3ef07a?style=for-the-badge)](https://carfashion.in)

> A modern, high-performance website for **Car Fashion** — an expert car repair, maintenance, periodic servicing, and performance diagnostic workshop located in **Surat, Gujarat, India**.

---

## 🌟 Highlights & Features

- 🏎️ **Modern Dark Aesthetic**: Sleek automotive dark UI with glassmorphic cards, vibrant accent glows (`#3ef07a`), and fluid typography using Google's *Plus Jakarta Sans*.
- 🔄 **Interactive Before & After Slider**: Interactive touch- and mouse-scrubbable image slider showcasing repair, detailing, and finish transformations.
- 📱 **1-Click WhatsApp Booking**: Integrated smart appointment form that formats customer details and directs reservations straight to WhatsApp.
- 🃏 **3D Interactive Step Cards**: Interactive flipping process cards detailing the workshop workflow from diagnosis to delivery.
- 🔍 **Local SEO & Schema.org Rich Snippets**: Pre-configured `AutoRepair` JSON-LD structured data with geo-coordinates, reviews rating (`4.8/5.0`), opening hours, and sitemap/robots.txt setup.
- ⚡ **Ultra-Fast & Zero Dependencies**: Built with pure semantic HTML5, Vanilla CSS, and lightweight modern JavaScript — no heavy build steps, node runtimes, or external frameworks required.
- 📱 **100% Fully Responsive**: Optimized for ultra-wide monitors, laptops, tablets, and smartphones with accessible mobile drawer navigation.

---

## 📁 Project Structure

```text
Car-Fashion/
├── index.html              # Main landing page (Hero rotator, Before/After slider, plans, FAQ, booking)
├── about.html              # About the workshop, certified technicians, history, and values
├── services.html           # Detailed service catalogue, diagnostic packages, and price list
├── contact.html            # Location map, working hours, contact info, and booking form
├── sitemap.xml             # Search engine sitemap for search crawlers
├── robots.txt              # Crawler access definitions
├── assets/
│   ├── favicon.svg         # Crisp SVG brand favicon
│   ├── logo.svg            # Car Fashion brand vector logo
│   ├── footer-glow.jpg     # Background glow texture asset
│   ├── styles.css          # Core design system, responsive rules, animations, theme tokens
│   └── main.js             # Navigation, dynamic rotator, before/after slider, modal, & form logic
└── README.md               # Project documentation & setup instructions
```

---

## 🚀 Quick Start / Local Development

Since this project uses pure standard web technologies, you can run it immediately without running `npm install`.

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*).
3. Right-click on `index.html` and select **"Open with Live Server"** (or click *Go Live* in the bottom status bar).
4. The site will open at `http://127.0.0.1:5500`.

### Option 2: Python Built-in HTTP Server
If you have Python installed:

```bash
# Python 3
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

### Option 3: Node.js (npx)
```bash
# Using serve
npx serve .

# Using http-server
npx http-server -p 8080
```

---

## 📄 Pages Overview

| Page | URL Path | Description |
| :--- | :--- | :--- |
| **Home** | `/` or `index.html` | Hero introduction with animated keyword rotator, interactive comparison slider, workshop workflow, featured plans, FAQs, and appointment form. |
| **About** | `/about.html` | The story behind Car Fashion Surat, engineering philosophy, certified master mechanics, and workshop safety standards. |
| **Services** | `/services.html` | Comprehensive automotive services breakdown (Periodic Servicing, Computerized Diagnostics, Brake & Suspension, Detailing, etc.). |
| **Contact** | `/contact.html` | Direct location directions, Google Maps link, WhatsApp quick-chat, operating timings, and appointment request form. |

---

## 🛠️ Tech Stack & Key Implementations

- **Markup**: Semantic HTML5 (Accessible ARIA landmarks, `application/ld+json` Schema).
- **Styles**: Custom CSS3 variables (design tokens), CSS Grid, Flexbox, smooth transitions, glassmorphism, and responsive media queries.
- **Scripts**: Modular Vanilla JavaScript (IIFE pattern, IntersectionObserver scroll reveal, Pointer events for before/after comparison, Toast notifications).
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.

---

## 📍 Business Details & Location

- **Workshop Name**: Car Fashion
- **Address**: S/15, CAR FASHION, GREEN RESIDENCY SHOWROOM, opp. DMART, Dindoli, Surat, Gujarat 394210, India
- **Phone**: [+91 84018 47989](tel:+918401847989)
- **WhatsApp**: [+91 84018 47989](https://wa.me/918401847989)
- **Website**: [https://carfashion.in](https://carfashion.in)
- **Hours**: Monday – Sunday: 10:00 AM – 09:00 PM IST

---

## 🚢 Deployment

The static nature of this repository makes it easily deployable to any modern static hosting provider:

- **Vercel**: Simply import the Git repository or run `vercel` in the root folder.
- **Netlify**: Drag and drop the folder or connect via GitHub with publish directory set to `./`.
- **GitHub Pages**: Go to *Repository Settings* → *Pages* → Select `main` branch `/ (root)` folder.
- **Cloudflare Pages**: Connect your repository and deploy with no build command.

---

## 📝 License

&copy; 2026 Car Fashion. All rights reserved.
