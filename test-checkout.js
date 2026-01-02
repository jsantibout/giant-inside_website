const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
  }
});

const SHOPIFY_STORE_DOMAIN = envVars.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_API_TOKEN = envVars.SHOPIFY_STOREFRONT_API_TOKEN;
const SHOPIFY_API_VERSION = envVars.SHOPIFY_API_VERSION || '2024-07';

const graphqlUrl = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

console.log('🛒 Testing Cart Creation and Checkout URL...\n');

const cartMutation = `
  mutation CreateCart {
    cartCreate(input: {}) {
      cart {
        id
        checkoutUrl
        totalQuantity
      }
    }
  }
`;

fetch(graphqlUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
  },
  body: JSON.stringify({ query: cartMutation }),
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error('❌ GraphQL Errors:', JSON.stringify(data.errors, null, 2));
      return;
    }
    
    const cart = data.data?.cartCreate?.cart;
    if (cart) {
      console.log('✅ Cart Created Successfully:\n');
      console.log('Cart ID:', cart.id);
      console.log('Checkout URL:', cart.checkoutUrl);
      console.log('\n📍 Testing if checkout URL is valid...');
      console.log('Domain:', new URL(cart.checkoutUrl).hostname);
    } else {
      console.error('❌ No cart data returned');
    }
  })
  .catch(err => console.error('Error:', err.message));
