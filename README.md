# E-Connect Solutions — React Website

A modern, production-ready React rebuild of [e-connectsolutions.com](https://www.e-connectsolutions.com), featuring smooth scroll animations, advanced UI design, and full responsiveness.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Framer Motion | Scroll & interaction animations |
| react-intersection-observer | Trigger animations on scroll |
| CSS Modules | Scoped component styling |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm 9+

### Install & Run

```bash
# Navigate to the project folder
cd e-connect-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to any static host (Netlify, Vercel, AWS S3, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
e-connect-react/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar/          # Sticky nav with scroll detection & mobile menu
│   │   ├── Hero/            # Full-screen hero with particle canvas animation
│   │   ├── Services/        # 6-service card grid with hover effects
│   │   ├── About/           # Two-column layout with animated stats card
│   │   ├── Stats/           # Animated count-up numbers section
│   │   ├── Products/        # Interactive expandable product cards
│   │   ├── Industries/      # Industry verticals + business processes panel
│   │   ├── WhyUs/           # Advantage cards + trust banner CTA
│   │   ├── Testimonials/    # Auto-rotating testimonial carousel
│   │   ├── Clients/         # Infinite marquee client scroll
│   │   ├── Contact/         # Contact form with validation + info panel
│   │   └── Footer/          # Full footer with newsletter signup
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── utils/
│   │   └── animations.js    # Reusable Framer Motion variants
│   ├── App.jsx
│   ├── index.css            # Global styles & CSS variables
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Features

- **Particle canvas animation** in the hero section
- **Scroll-triggered animations** on every section (fade up, fade left/right, scale in)
- **Staggered card animations** for services, products, and why-us sections
- **Animated count-up numbers** in the stats section
- **Auto-rotating testimonial carousel** with manual dot navigation
- **Infinite marquee** for client logos
- **Interactive product cards** with expand/collapse details
- **Contact form** with client-side validation
- **Fully responsive** — mobile, tablet, desktop
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation
- **CSS custom properties** for consistent theming

---

## Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| `--blue-primary` | `#0057FF` | Primary brand color |
| `--blue-dark` | `#003DB3` | Dark variant |
| `--accent-cyan` | `#00C2FF` | Gradient accent |
| `--text-dark` | `#0A0F1E` | Headings |
| `--text-mid` | `#3D4A6B` | Body text |
| `--text-light` | `#7A8AAD` | Muted text |

---

## Deployment

The `dist/` folder after `npm run build` can be deployed to:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: `vercel --prod` from the project root
- **GitHub Pages**: Use `gh-pages` package
- **Any static host**: Upload `dist/` contents
