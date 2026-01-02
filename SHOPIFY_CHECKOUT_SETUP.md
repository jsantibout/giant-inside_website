# Fixing Shopify Checkout 404 Error

## Problem
Both `giantinsidebrand.com` and `0d7392.myshopify.com` return 404 errors because your Shopify **Online Store** sales channel is not published yet.

## Solution

### Step 1: Enable the Online Store Channel

1. **Log into Shopify Admin** at `https://admin.shopify.com/store/0d7392`

2. **Go to Sales Channels**
   - Click **Settings** (bottom left)
   - Click **Apps and sales channels**
   - OR click the **+** next to "Sales channels" in the left sidebar

3. **Add Online Store**
   - Find "Online Store" in the list
   - Click **Add** or **Install** if not already added
   - Click **Open sales channel**

4. **Publish Your Store**
   - In the Online Store section, you should see a theme
   - Click **Customize** on your theme
   - In the top bar, click the **eye icon** or **Preview** dropdown
   - Look for an option to **Publish** or **Enable** the store
   - OR go to **Online Store → Preferences**
   - Under **Password protection**, **UNCHECK** "Restrict access to visitors with the password"
   - Click **Save**

### Step 2: Verify Checkout Settings

1. **Go to Settings → Checkout**
2. Make sure checkout is enabled
3. Check **Customer contact** and **Customer information** settings
4. Save any changes

### Step 3: Test Checkout

After enabling the Online Store:

1. Visit `https://0d7392.myshopify.com` - should show your Shopify theme
2. Visit `https://giantinsidebrand.com` - should show your store (if domain is connected)
3. Test the checkout flow on your Next.js site

## Alternative: Use Headless Checkout (If You Don't Want a Shopify Theme)

If you want to use **only** your Next.js storefront without the Shopify Online Store theme:

### Option 1: Keep Password Protection (Development Mode)

1. Keep the Online Store password-protected
2. The checkout page will still work - customers will see:
   - Your Next.js site (no password needed)
   - Shopify checkout page when they click "Checkout" (also no password needed)
   - Only direct visits to the store domain will show password

### Option 2: Hide the Shopify Theme

1. **Go to Online Store → Themes**
2. Click **Customize** on your active theme
3. Remove/hide all sections to make it blank
4. Or install a minimal "headless" theme from the Shopify Theme Store

### Option 3: Use Shopify Plus (Advanced)

If you have Shopify Plus, you can use:
- **Headless Checkout** - completely custom checkout on your domain
- **Checkout Extensibility** - customize Shopify's checkout

## Why This Happens

The Storefront API (which your Next.js site uses) works independently of the Online Store channel. However:

- ✅ **Storefront API** = Works (that's why products load)
- ❌ **Checkout Page** = Requires Online Store to be enabled
- ❌ **Cart Page** = Lives on Shopify's domain, needs Online Store

## After Setup

Once the Online Store is enabled, the checkout URL will work:
```
https://giantinsidebrand.com/cart/c/[cart-id]?key=[key]
```

This redirects customers to Shopify's secure checkout, then back to your site after purchase (if configured).

## Questions?

If you need help with any of these steps, check:
- [Shopify Help: Setting up your online store](https://help.shopify.com/en/manual/online-store/themes/adding-themes)
- [Shopify Help: Password protection](https://help.shopify.com/en/manual/online-store/password-protection)
