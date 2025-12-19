# Shopify Setup Guide

This guide will help you set up your Shopify store integration.

## Prerequisites

You need a Shopify store. If you don't have one yet:
1. Go to [shopify.com](https://www.shopify.com)
2. Sign up for an account
3. Complete the store setup

## Step 1: Create a Custom App

1. Log in to your Shopify Admin
2. Go to **Settings** (bottom left) → **Apps and sales channels**
3. Click **Develop apps** (or **Develop apps for your store**)
4. If prompted, click **Allow custom app development**
5. Click **Create an app**
6. Give your app a name (e.g., "Giant Inside Website")
7. Click **Create app**

## Step 2: Configure Storefront API Access

1. Click on **Configure Storefront API scopes**
2. Under **Storefront API access scopes**, select the following permissions:
   - `unauthenticated_read_product_listings` (Read product listings)
   - `unauthenticated_read_product_inventory` (Read product inventory)
   - `unauthenticated_read_product_tags` (Read product tags)
   - `unauthenticated_write_checkouts` (Create checkouts)
   - `unauthenticated_read_checkouts` (Read checkouts)
3. Click **Save**

## Step 3: Install the App

1. Click on the **API credentials** tab
2. Click **Install app**
3. Click **Install** to confirm

## Step 4: Get Your API Credentials

1. After installation, you'll see the **Storefront API access token**
2. Click **Reveal token once** to see your token
3. **IMPORTANT**: Copy this token immediately - you won't be able to see it again!

## Step 5: Update Your Environment Variables

1. Open your `.env.local` file in the project root
2. Update the following variables:

```bash
# Your store domain (without https://)
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# The Storefront API access token you just copied
SHOPIFY_STOREFRONT_API_TOKEN=your-token-here

# The API version (use the latest stable version)
SHOPIFY_API_VERSION=2024-10
```

### Finding Your Store Domain

Your store domain is in the format: `your-store-name.myshopify.com`

You can find it:
- In the URL when you're logged into Shopify Admin
- In **Settings** → **Domains**

## Step 6: Add Products to Your Store

1. In Shopify Admin, go to **Products**
2. Click **Add product**
3. Fill in the product details:
   - Title
   - Description
   - Media (images)
   - Pricing
   - Inventory
4. Make sure to set the product as **Active** and available on the **Online Store** sales channel
5. Click **Save**

## Step 7: Test Your Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/shop`

3. You should now see your products displayed!

## Troubleshooting

### "Unauthorized" Error

If you see an unauthorized error:

1. **Check your credentials**: Make sure you copied the Storefront API token correctly
2. **Verify API scopes**: Ensure you enabled the required Storefront API scopes
3. **Check token format**: The token should start with something like `shpat_`
4. **Restart your dev server**: After changing `.env.local`, always restart the server

### No Products Showing

If the page loads but shows "No products available":

1. **Add products**: Make sure you have at least one product in your Shopify store
2. **Check product status**: Products must be set to "Active"
3. **Check sales channel**: Products must be available on the "Online Store" sales channel

### API Version Issues

If you're getting version-related errors:

1. Check the latest Shopify API version at [Shopify API Documentation](https://shopify.dev/docs/api/release-notes)
2. Update `SHOPIFY_API_VERSION` in `.env.local` to the latest stable version

## Security Notes

- **Never commit** your `.env.local` file to git (it's already in `.gitignore`)
- The Storefront API token is public-facing and safe to use in client-side applications
- However, keep it in `.env.local` on the server for better security practices
- For production, add these environment variables to your hosting platform (Vercel, Netlify, etc.)

## Need Help?

- [Shopify Storefront API Documentation](https://shopify.dev/docs/api/storefront)
- [Shopify GraphQL Storefront API Reference](https://shopify.dev/docs/api/storefront/latest)
