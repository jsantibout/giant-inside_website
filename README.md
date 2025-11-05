# Giant Inside - Brand Website

Built for those who rise after every setback.

## Overview

This is the official website for Giant Inside, an athletic apparel brand focused on resilience, faith, mindset, and community. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Bebas Neue, Montserrat)
- **Icons:** Lucide React
- **Form Handling:** Formspree (configurable)
- **E-commerce:** Shopify Buy Button SDK (ready for integration)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd giant-inside
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration values (see Environment Variables section below).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
giant-inside/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── shop/                # Shop page
│   ├── about/               # About page
│   ├── partnerships/        # Partnerships page
│   ├── contact/             # Contact page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── Header.tsx           # Sticky navigation
│   ├── Footer.tsx           # Site footer
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── ProductCard.tsx
│       └── ContactForm.tsx
├── lib/                     # Utility functions
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
│   └── images/             # Image files
└── tailwind.config.ts       # Tailwind configuration
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

### Shopify Integration (when products are ready)
```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
```

To get these:
1. Create a Shopify account at shopify.com
2. Go to Settings → Apps and sales channels
3. Add the "Buy Button" sales channel
4. Get your Storefront Access Token from the Buy Button settings

### Form Integration
```
NEXT_PUBLIC_FORMSPREE_CONTACT_FORM=your-form-id
NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM=your-form-id
```

To set up forms:
1. Sign up at formspree.io (free tier: 50 submissions/month)
2. Create two forms (one for contact, one for partnerships)
3. Copy the form IDs from the dashboard

### Google Analytics (optional)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

To enable analytics:
1. Create a GA4 property at analytics.google.com
2. Copy your Measurement ID
3. Add to root layout.tsx using @next/third-parties/google

## Pages

### Home (`/`)
- Hero section with brand tagline
- Brand story section
- Featured products
- Core values (Resilience, Faith, Mindset, Community)
- CTA section

### Shop (`/shop`)
- Product grid with category filters
- Empty state with Instagram CTA
- Ready for Shopify Buy Button integration

### About (`/about`)
- Founder story
- Mission statement
- Deep dive into brand values

### Partnerships (`/partnerships`)
- Partnership benefits
- Who we work with
- How it works
- Partnership inquiry form

### Contact (`/contact`)
- Contact information
- Contact form
- Social media links

## Design System

### Colors
- **Primary:** Gold (#D4AF37)
- **Accent:** Forest Green (#2D5016), Olive Green (#556B2F)
- **Neutrals:** Black, Charcoal (#1A1A1A), White

### Typography
- **Headings:** Bebas Neue (bold, athletic)
- **Body:** Montserrat (400, 500, 600, 700)

### Button Variants
- **Primary:** Gold background, black text
- **Secondary:** Gold outline, gold text
- **Tertiary:** White background, black text

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

### Deploying to Vercel

1. Push your code to GitHub

2. Import project in Vercel:
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository

3. Configure environment variables in Vercel dashboard

4. Deploy!

Vercel will automatically:
- Build and deploy your site
- Enable automatic deployments on push
- Provide SSL certificate
- Set up CDN caching

### Custom Domain

1. Purchase a domain (Namecheap, Google Domains, or Vercel)
2. Add custom domain in Vercel project settings
3. Configure DNS records (Vercel provides instructions)
4. SSL is automatic

## Future Integrations

### Shopify Products
When products are ready:
1. Enable Shopify Buy Button in your Shopify admin
2. Add environment variables
3. Create products in Shopify
4. Update ProductCard components with product IDs
5. Test checkout flow

### Google Analytics
To add analytics:
1. Install: `npm install @next/third-parties`
2. Add to `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
      </body>
    </html>
  )
}
```

## Content Updates

### Updating Placeholder Content
- **Founder photo:** Add to `/public/images/` and update in About page
- **Product images:** Add to `/public/images/` and pass to ProductCard components
- **Location:** Update "Based in [City, State]" in Contact page (app/contact/page.tsx:72)
- **Brand story:** Edit content in Home page (app/page.tsx)

### Adding Real Products
Update the ProductCard components in Shop page with actual:
- Product names
- Prices
- Images
- Shopify product IDs

## Support

For questions or issues:
- Email: 
- Instagram: [@giantinside](https://instagram.com/giantinside)

## License

All rights reserved © 2024 Giant Inside
