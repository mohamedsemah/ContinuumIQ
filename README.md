# ContinuumIQ Marketing Website

AI Customer Exit Risk Intelligence Platform — marketing website built with Next.js, deployed on Vercel.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Charts**: Apache ECharts + Recharts
- **i18n**: next-intl (English + Arabic with full RTL)
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, crisis, industries, gap, platform, value, case studies, CTA |
| Platform | `/platform` | Platform capabilities and architecture |
| Industries | `/industries` | Industry churn analysis and use cases |
| Case Studies | `/case-studies` | Validated performance metrics |
| Pricing | `/pricing` | Tiered pricing with enterprise option |
| Security | `/security` | Compliance and data protection |
| Resources | `/resources` | Whitepapers, guides, reports |
| About | `/about` | Mission, vision, strategic moats |
| Contact | `/contact` | Demo booking form |

All pages available in English (`/en/...`) and Arabic (`/ar/...`).

## Deployment

Optimized for Vercel:

```bash
npm run build
```

Push to a Git repository and connect to Vercel for automatic deployments.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (optional) |
