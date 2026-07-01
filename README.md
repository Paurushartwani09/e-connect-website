<div align="center">

<img src="public/espl-logo-wh2.png" alt="E-Connect Solutions" width="180" style="filter: invert(1);" />

# E-Connect Solutions — Website

### Enterprise IT Solutions · Enabling IT Since 1991

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-Paurushartwani09.github.io-0057FF?style=for-the-badge&labelColor=001F6B)](https://Paurushartwani09.github.io/e-connect-website)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0B0F1A)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0B0F1A)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=0B0F1A)](https://vitejs.dev)

---

> *"We are consistently delivering business value to our customers, enabling them to excel and win in the emerging e-Economy."*
> — **Jaimin Patel**, Chief Business Officer & Founder

</div>

---

## 🎨 Design System

### Color Palette

| Swatch | Variable | Hex | Usage |
|:------:|----------|-----|-------|
| 🔵 | `--blue-primary` | `#0057FF` | Primary brand, CTAs, links |
| 🌑 | `--blue-deeper` | `#001F6B` | Hero backgrounds, dark sections |
| 🟦 | `--blue-dark` | `#003DB3` | Hover states, dark variant |
| 🩵 | `--accent-cyan` | `#00C2FF` | Gradients, highlights, rings |
| 🟣 | `--accent-purple` | `#7B61FF` | Secondary accent, cards |
| 🟢 | `--accent-green` | `#00B894` | Success states, RC accent |
| 🟠 | `--accent-orange` | `#FF6B35` | Warning, JP accent |
| 🩷 | `--accent-pink` | `#E84393` | Special highlights |

### Typography

```
Font Family: 'Raleway', -apple-system, BlinkMacSystemFont, sans-serif
Weights used: 400 · 600 · 700 · 800

Headings  → Raleway 800  (clamp-based fluid sizing)
Body      → Raleway 400  (line-height: 1.6–1.8)
Labels    → Raleway 700  (letter-spacing: 2px, uppercase)
```

### Gradient — Hero
```css
background: linear-gradient(135deg, #001F6B 0%, #0057FF 50%, #00C2FF 100%);
```

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3 | UI framework |
| **TypeScript** | 5.5 | Type safety across all components |
| **Vite** | 5.3 | Lightning-fast build tool & dev server |
| **Framer Motion** | 11.2 | Scroll & interaction animations |
| **React Router DOM** | 7.x | Client-side routing (HashRouter) |
| **React Intersection Observer** | 9.x | Trigger animations on scroll |
| **Lucide React** | 1.x | Icon library (UI components) |
| **React Icons** | 5.x | Icon library (pages & forms) |
| **EmailJS Browser** | 4.x | Contact form email delivery |
| **CSS Modules** | — | Scoped component styling |
| **vite-plugin-compression** | 0.5 | Gzip asset compression |

---

## 📁 Project Structure

```
e-connect-website/
│
├── public/                          # Static assets (served as-is)
│   ├── espl-logo-wh2.png           # White logo (navbar, hero)
│   ├── espl-logo-sticky.jpg        # Dark logo (scrolled navbar)
│   ├── jamin-sir2.png              # Jaimin Patel photo
│   ├── mukesh-vyas-sir.png         # Mukesh Vyas photo
│   ├── rajendra-ch-sir.png         # Rajendra Chouhan photo
│   ├── favicon.svg
│   └── _redirects                  # Netlify/gh-pages routing
│
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── Navbar/                 # Sticky nav · scroll detection · mobile menu · products dropdown
│   │   ├── Hero/                   # Full-screen slider · particle canvas · orbital visual
│   │   ├── Services/               # 4 service cards · engagement models · sticky left col
│   │   ├── About/                  # Stats card · floating badges · quote block
│   │   ├── Stats/                  # Animated count-up · icon rings · highlights bar
│   │   ├── Products/               # 2×3 product grid · deployment options
│   │   ├── Industries/             # Govt & Enterprise cards · business processes panel
│   │   ├── WhyUs/                  # 6 advantage cards · trust banner CTA
│   │   ├── Testimonials/           # Auto-rotating carousel · side cards · photos
│   │   ├── Clients/                # Dual infinite marquee
│   │   ├── Contact/                # EmailJS form · validation · FAQ accordion
│   │   ├── Footer/                 # Full footer · newsletter
│   │   ├── PageHero/               # Reusable page hero with gradient + orbs + wave
│   │   ├── PageLoader/             # Route suspense loader
│   │   └── ScrollToTop/            # Scroll to top on route change
│   │
│   ├── pages/
│   │   ├── Home/                   # HomePage (section stack)
│   │   ├── About/                  # Mission · Timeline · Values · Leadership
│   │   ├── Services/               # 6 service cards · process steps · CTA
│   │   ├── Products/               # Product explorer · all 6 products grid
│   │   │   ├── EPrashashanPage     # E-Prashashan detail
│   │   │   ├── CitizenConnctPage   # Citizen CONNCT detail
│   │   │   ├── SelctPage           # SELCT ATS detail
│   │   │   ├── AnytimeAuctionPage  # Anytime Auction detail
│   │   │   ├── AnytimeRentalsPage  # Anytime Rentals detail
│   │   │   └── WorkXPage           # WorkX detail
│   │   ├── Industries/             # Industry explorer · processes · stats
│   │   ├── WhyUs/                  # Advantages · comparison table · CTA
│   │   ├── Careers/                # Filter panel · job listings · hiring process
│   │   ├── Media/                  # News · gallery · media kit · press
│   │   └── Contact/                # Contact cards · form · FAQ
│   │
│   ├── context/
│   │   └── ThemeContext.tsx        # Light/Dark theme toggle
│   │
│   ├── data/
│   │   └── productsData.ts         # All 6 products with typed interfaces
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.ts   # Intersection observer hook
│   │
│   ├── utils/
│   │   └── animations.ts           # Framer Motion Variants (fadeUp, stagger, etc.)
│   │
│   ├── App.tsx                     # Routes (HashRouter + lazy loading)
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles · CSS variables · themes
│   └── vite-env.d.ts               # TypeScript asset declarations
│
├── index.html                      # Entry HTML (Raleway font · meta tags · OG)
├── vite.config.ts                  # Build config · chunk splitting · compression
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Paurushartwani09/e-connect-website.git
cd e-connect-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

```bash
npm run dev        # Start Vite dev server (hot reload)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run deploy     # Build + deploy to GitHub Pages (gh-pages branch)
```

---

## 🌐 Deployment (GitHub Pages)

This project is configured for GitHub Pages via `gh-pages`.

```bash
npm run deploy
```

**How it works:**
1. `predeploy` runs `npm run build` — outputs to `dist/`
2. `deploy` pushes `dist/` to the `gh-pages` branch
3. GitHub Pages serves from the `gh-pages` branch

> ⚠️ A regular `git push` to `main` does **not** update the live site.
> Always run `npm run deploy` to publish changes.

**Live URL:** [https://Paurushartwani09.github.io/e-connect-website](https://Paurushartwani09.github.io/e-connect-website)

---

## 📧 Email Integration (EmailJS)

The contact forms use [EmailJS](https://www.emailjs.com) to send form submissions directly to `paurushartwanieconnect@gmail.com` without a backend.

To activate:

1. Create a free account at [emailjs.com](https://www.emailjs.com)
2. Connect your Gmail account → get a **Service ID**
3. Create an email template → get a **Template ID**
4. Copy your **Public Key** from Account settings

Update these constants in both contact files:

```typescript
// src/pages/Contact/ContactPage.tsx
// src/components/Contact/Contact.tsx
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

---

## 🏗️ Build Optimizations

The `vite.config.ts` is configured for maximum performance:

| Optimization | Detail |
|--------------|--------|
| **Manual chunk splitting** | React · Router · Framer Motion · Icons each in separate cached chunks |
| **Gzip compression** | All JS/CSS assets compressed with `.gz` via `vite-plugin-compression` |
| **CSS code splitting** | Each route loads only its own CSS |
| **Non-blocking fonts** | Google Fonts loaded via `preload` + `onload` swap (no render blocking) |
| **Asset inlining** | Files < 4KB base64 inlined (saves HTTP requests) |
| **esbuild minifier** | Faster & smaller than Terser |
| **`prefers-reduced-motion`** | Animations disabled for users who prefer it |

**Bundle sizes (gzipped):**

```
vendor-react    →  45 KB   (React + ReactDOM)
vendor-motion   →  36 KB   (Framer Motion)
vendor-router   →  13 KB   (React Router)
vendor-lucide   →   6 KB   (Lucide icons)
vendor-icons    →   4 KB   (React Icons)
HomePage        →  16 KB   (largest page)
```

---

## 🧩 Products

| Product | Category | Clients |
|---------|----------|---------|
| **E-Prashashan** | Enterprise Resource Planning | 80+ |
| **Citizen CONNCT** | E-Governance & Citizen Services | 60+ |
| **SELCT** | HR Technology & Talent Acquisition | 45+ |
| **Anytime Auction** | Online Auction & Asset Management | 30+ |
| **Anytime Rentals** | Venue & Event Management | 25+ |
| **WorkX** | Works & Contract Management | 35+ |

---

## 🏢 About E-Connect Solutions

| | |
|--|--|
| **Founded** | 1991 |
| **HQ** | G-18,19,20 IT Park, M.I.A. Udaipur-313001, Rajasthan, India |
| **Team** | 500+ professionals |
| **Certification** | CMMI Level 5 |
| **Verticals** | 25+ industry verticals |
| **Users** | 100K+ active users on government platforms |
| **Phone** | +91-294-6657300 |
| **Email** | sales@e-connectsolutions.com |

---

## 🔗 Links

| | |
|--|--|
| 🌐 **Live Website** | [Paurushartwani09.github.io/e-connect-website](https://Paurushartwani09.github.io/e-connect-website) |
| 💼 **Company Website** | [e-connectsolutions.com](https://www.e-connectsolutions.com) |
| 🐙 **GitHub Repo** | [github.com/Paurushartwani09/e-connect-website](https://github.com/Paurushartwani09/e-connect-website) |
| 💼 **LinkedIn** | [linkedin.com/company/e-connectsolutions-pvt.-limited](https://at.linkedin.com/company/e-connectsolutions-pvt.-limited) |
| 🐦 **Twitter** | [@esplrajasthan](https://twitter.com/esplrajasthan) |
| 📘 **Facebook** | [facebook.com/espludaipur](https://www.facebook.com/espludaipur) |

---

<div align="center">

**© 2025 E-Connect Solutions Pvt. Ltd. · All Rights Reserved**

*Enabling IT Since 1991 · CMMI Level 5*

[![Made with React](https://img.shields.io/badge/Made_with-React_18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=0B0F1A)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-0057FF?style=flat-square&logo=github&logoColor=white)](https://pages.github.com)

</div>
