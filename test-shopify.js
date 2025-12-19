// Quick test script to verify Shopify API connection
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

console.log('🔍 Testing Shopify Storefront API Connection...\n');
console.log('Configuration:');
console.log(`- Store Domain: ${SHOPIFY_STORE_DOMAIN}`);
console.log(`- API Version: ${SHOPIFY_API_VERSION}`);
console.log(`- Token Length: ${SHOPIFY_STOREFRONT_API_TOKEN?.length || 0} characters`);
console.log('');

const graphqlUrl = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
console.log(`- GraphQL URL: ${graphqlUrl}\n`);

// First, let's check what we can query
const scopeTestQuery = `
  query TestScopes {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

const productsQuery = `
  query GetProducts {
    products(first: 5) {
      edges {
        node {
          id
          handle
          title
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

async function testShopifyAPI() {
  try {
    // Test 1: Check basic shop access
    console.log('📋 Test 1: Checking shop access and scopes...\n');
    const scopeResponse = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query: scopeTestQuery }),
    });

    const scopeJson = await scopeResponse.json();

    if (scopeJson.errors) {
      console.error('❌ Shop query errors (this might indicate missing scopes):');
      scopeJson.errors.forEach((err) => {
        console.error(`  - ${err.message}`);
      });
    } else if (scopeJson.data?.shop) {
      console.log(`✅ Shop Access Confirmed:`);
      console.log(`   - Shop Name: ${scopeJson.data.shop.name}`);
      console.log(`   - Domain: ${scopeJson.data.shop.primaryDomain.url}\n`);
    }

    // Test 2: Fetch products
    console.log('📋 Test 2: Fetching products...\n');
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query: productsQuery }),
    });

    console.log(`📡 Response Status: ${response.status} ${response.statusText}\n`);

    const json = await response.json();

    if (json.errors) {
      console.error('❌ GraphQL Errors:');
      json.errors.forEach((err) => {
        console.error(`  - ${err.message}`);
        if (err.extensions) {
          console.error(`    Extensions:`, err.extensions);
        }
      });
      console.log('\n💡 Common issues:');
      console.log('   1. Missing Storefront API scopes in your custom app');
      console.log('   2. Products not published to the correct sales channel');
      console.log('   3. Using Admin API token instead of Storefront API token\n');
      return;
    }

    if (json.data && json.data.products) {
      const products = json.data.products.edges;
      console.log(`✅ Successfully fetched ${products.length} products:\n`);

      products.forEach((edge, index) => {
        const product = edge.node;
        console.log(`${index + 1}. ${product.title}`);
        console.log(`   - Handle: ${product.handle}`);
        console.log(`   - Available: ${product.availableForSale}`);
        console.log(`   - Price: ${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`);
        console.log(`   - Images: ${product.images.edges.length}`);
        console.log('');
      });

      if (products.length === 0) {
        console.log('⚠️  No products found in your store.');
        console.log('\n📝 Next steps:');
        console.log('   1. Go to Shopify Admin → Products');
        console.log('   2. Create products or select existing ones');
        console.log('   3. For each product, scroll to "Sales channels and apps"');
        console.log('   4. Make sure "Headless" channel is checked ✅');
        console.log('   5. Save the product');
        console.log('\n   Alternatively, check "Online Store" if you don\'t see "Headless"');
      }
    } else {
      console.log('⚠️  Unexpected response structure:');
      console.log(JSON.stringify(json, null, 2));
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testShopifyAPI();
