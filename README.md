# BundleBoB
bundlebob-portfolio/
├── app/
│   ├── layout.tsx          ← Syne + DM Sans fonts, SEO metadata, Header/Footer wrappers
│   ├── page.tsx            ← Main homepage (all sections wired up)
│   ├── about/page.tsx      ← /about route
│   └── contact/page.tsx    ← /contact route
├── components/
│   ├── Header/             ← Sticky nav, BundleBOB logo + pulsing dot, hamburger menu
│   ├── Hero/               ← Big headline, stats row (50+, 98%, 4x ROI)
│   ├── Brands/             ← Dual scrolling marquee (services + tech stack)
│   ├── Features/           ← 6-card services grid with icons + tags
│   ├── Video/              ← 4-step process section
│   ├── About/              ← About copy + tech pills + "Why BundleBOB" box
│   ├── Testimonials/       ← 4 client quote cards
│   ├── Pricing/            ← 3-tier pricing (Starter / Growth / Enterprise)
│   ├── Contact/            ← CTA band → Calendly + trust badges
│   ├── Footer/             ← Full footer with links + Irving TX address
│   ├── Common/Breadcrumb   ← Reusable page header for inner pages
│   └── ScrollToTop/        ← Floating back-to-top button
├── styles/index.css        ← CSS variables, noise overlay, marquee + reveal animations
└── tailwind.config.js      ← Custom colors (accent: #b8ff57), font variables, container
