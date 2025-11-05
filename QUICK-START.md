# Giant Inside - Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 3. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
giant-inside/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop page
│   ├── about/             # About page
│   ├── partnerships/      # Partnerships page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Header.tsx        # Navigation
│   ├── Footer.tsx        # Footer
│   └── ui/               # Reusable components
└── public/images/        # Static images

```

## Pages Included

✅ **Home** - Hero, brand story, products, values, CTA
✅ **Shop** - Product grid with "Coming Soon" state
✅ **About** - Founder story, mission, values
✅ **Partnerships** - Team partnerships with contact form
✅ **Contact** - Contact form and information

## Design System

### Colors
- **Gold:** `#D4AF37` (primary CTA color)
- **Forest Green:** `#2D5016` (accent)
- **Charcoal:** `#1A1A1A` (dark backgrounds)
- **Black & White:** Core neutrals

### Fonts
- **Headings:** Bebas Neue (bold, athletic)
- **Body:** Montserrat (400-700 weights)

## Next Steps

### 1. Update Placeholder Content
- Add founder photo to `/public/images/`
- Replace placeholder text with real content
- Update location in Contact page

### 2. Set Up Forms (Formspree)
1. Sign up at [formspree.io](https://formspree.io)
2. Create two forms (contact & partnerships)
3. Add form IDs to `.env.local`:
```
NEXT_PUBLIC_FORMSPREE_CONTACT_FORM=your-id
NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM=your-id
```

### 3. Integrate Shopify (When Products Ready)
1. Create Shopify store
2. Enable Buy Button sales channel
3. Add credentials to `.env.local`:
```
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
```
4. Update ProductCard components with product IDs

### 4. Deploy to Vercel
1. Push code to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

## Support

📧 
📱 [@giantinside](https://instagram.com/giantinside)

---

**Built for those who rise after every setback.**
