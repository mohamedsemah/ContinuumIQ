# ContinuumIQ Marketing Website

AI Customer Exit Risk Intelligence Platform - marketing website built with Next.js, deployed on Vercel.

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
| Contact | `/contact` | Demo booking form (API email + `mailto` fallback) |

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
| `RESEND_API_KEY` | [Resend](https://resend.com) API key - required for the contact form to send email from the server |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `ContinuumIQ <mail@yourdomain.com>` (Resend onboarding domain works for tests) |
| `CONTACT_TO_EMAIL` | Inbox that receives demo requests. With Resend’s default **testing** sender (`onboarding@resend.dev`), this must be the **same email as your Resend account** until you [verify a domain](https://resend.com/domains) and use a `yourdomain.com` `from` address |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID (optional) |

Copy `.env.example` to `.env.local` (in this `website` folder, next to `package.json`) and fill in the Resend variables. If they are missing, **Book a Demo** still validates the form, but the API returns an error message and users can use **Compose in email app** (`mailto:`) instead.

Run `npm run dev` from the **`website`** directory, or rely on `next.config.ts` which also loads `.env.local` from `./website` when the shell’s current directory is the parent folder. After changing env vars, restart the dev server.
