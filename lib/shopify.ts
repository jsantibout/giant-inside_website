import {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ShopifyResponse,
  CartLineInput,
  CartLineUpdateInput,
} from './types/shopify';
import { getServerEnv } from './env';

// Lazy initialization - only access env vars when actually needed (server-side)
let _env: ReturnType<typeof getServerEnv> | null = null;

function getShopifyConfig() {
  if (!_env) {
    _env = getServerEnv();
  }
  return _env;
}

function getGraphQLUrl() {
  const env = getShopifyConfig();
  return `https://${env.SHOPIFY_STORE_DOMAIN}/api/${env.SHOPIFY_API_VERSION}/graphql.json`;
}

/**
 * Generic function to make GraphQL requests to Shopify Storefront API
 */
async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<T> {
  try {
    const env = getShopifyConfig();
    const graphqlUrl = getGraphQLUrl();

    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache,
      ...(tags && { next: { tags } }),
    });

    // Try to parse response body (may fail for non-JSON error responses)
    let json: ShopifyResponse<T> | null = null;
    try {
      json = await response.json();
    } catch (parseError) {
      // If JSON parsing fails, we'll handle it below
    }

    // Check for HTTP errors first
    if (!response.ok) {
      const statusCode = response.status;
      let errorMessage = `Shopify API error: ${response.statusText} (${statusCode})`;
      
      // Provide specific guidance for authentication errors
      if (statusCode === 401 || statusCode === 403) {
        errorMessage += '\n\n🔐 Authentication Error:\n';
        errorMessage += 'This usually means:\n';
        errorMessage += '1. Your SHOPIFY_STOREFRONT_API_TOKEN is missing or incorrect\n';
        errorMessage += '2. The token has been revoked or expired\n';
        errorMessage += '3. The token doesn\'t have the required permissions\n';
        errorMessage += '4. Your SHOPIFY_STORE_DOMAIN is incorrect\n\n';
        errorMessage += 'Please check your .env.local file and verify:\n';
        errorMessage += `- SHOPIFY_STORE_DOMAIN=${env.SHOPIFY_STORE_DOMAIN ? '✓ Set' : '✗ Missing'}\n`;
        errorMessage += `- SHOPIFY_STOREFRONT_API_TOKEN=${env.SHOPIFY_STOREFRONT_API_TOKEN ? '✓ Set (length: ' + env.SHOPIFY_STOREFRONT_API_TOKEN.length + ')' : '✗ Missing'}\n`;
        errorMessage += `- API URL: ${graphqlUrl}\n`;
        errorMessage += '\nSee SHOPIFY_SETUP.md for instructions on creating a Storefront API token.';
      }
      
      // Include GraphQL errors if present and JSON was parsed successfully
      if (json && json.errors && json.errors.length > 0) {
        errorMessage += '\n\nGraphQL Errors:';
        json.errors.forEach((err: any) => {
          errorMessage += `\n- ${err.message}`;
          if (err.extensions) {
            errorMessage += ` (${JSON.stringify(err.extensions)})`;
          }
        });
      }
      
      throw new Error(errorMessage);
    }

    // If we couldn't parse JSON, throw an error
    if (!json) {
      throw new Error('Failed to parse Shopify API response as JSON');
    }

    // Check for GraphQL errors in successful HTTP responses
    if (json.errors) {
      console.error('Shopify GraphQL Errors:', json.errors);
      const errorMessages = json.errors.map((err: any) => err.message).join(', ');
      throw new Error(`Shopify GraphQL error: ${errorMessages}`);
    }

    return json.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

/**
 * Get all products with basic information
 * Cached for 1 hour to reduce API calls
 */
export async function getProducts(
  limit: number = 20
): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts($limit: Int!) {
      products(first: $limit) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            availableForSale
            tags
            vendor
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>({
    query,
    variables: { limit },
    cache: 'force-cache',
    tags: ['products'],
  });

  return data.products.edges.map((edge) => edge.node);
}

/**
 * Get a single product by handle
 * Cached for 1 hour with per-product tag for granular revalidation
 */
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        availableForSale
        tags
        vendor
        productType
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              id
              url
              altText
              width
              height
            }
          }
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                id
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query,
    variables: { handle },
    cache: 'force-cache',
    tags: ['products', `product-${handle}`],
  });

  return data.productByHandle;
}

/**
 * Get all collections
 */
export async function getCollections(
  limit: number = 20
): Promise<ShopifyCollection[]> {
  const query = `
    query GetCollections($limit: Int!) {
      collections(first: $limit) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>({
    query,
    variables: { limit },
    cache: 'force-cache',
    tags: ['collections'],
  });

  return data.collections.edges.map((edge) => edge.node);
}

/**
 * Get a single collection by handle with products
 * Cached for 1 hour with per-collection tag for granular revalidation
 */
export async function getCollectionByHandle(
  handle: string,
  limit: number = 20
): Promise<ShopifyCollection | null> {
  const query = `
    query GetCollectionByHandle($handle: String!, $limit: Int!) {
      collectionByHandle(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        image {
          id
          url
          altText
          width
          height
        }
        products(first: $limit) {
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
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collectionByHandle: ShopifyCollection | null;
  }>({
    query,
    variables: { handle, limit },
    cache: 'force-cache',
    tags: ['collections', `collection-${handle}`],
  });

  return data.collectionByHandle;
}

/**
 * Create a new cart
 */
export async function createCart(
  lines: CartLineInput[] = []
): Promise<ShopifyCart> {
  const query = `
    mutation CreateCart($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart };
  }>({
    query,
    variables: { lines },
    cache: 'no-store',
  });

  return data.cartCreate.cart;
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      id
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query,
    variables: { cartId },
    cache: 'no-store',
  });

  return data.cart;
}

/**
 * Add lines to cart
 */
export async function addToCart(
  cartId: string,
  lines: CartLineInput[]
): Promise<ShopifyCart> {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart };
  }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesAdd.cart;
}

/**
 * Update cart lines
 */
export async function updateCart(
  cartId: string,
  lines: CartLineUpdateInput[]
): Promise<ShopifyCart> {
  const query = `
    mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart };
  }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store',
  });

  return data.cartLinesUpdate.cart;
}

/**
 * Remove lines from cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = `
    mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            totalTaxAmount {
              amount
              currencyCode
            }
          }
          lines(first: 250) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart };
  }>({
    query,
    variables: { cartId, lineIds },
    cache: 'no-store',
  });

  return data.cartLinesRemove.cart;
}

/**
 * Format price for display
 */
export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

/**
 * Check if product is on sale
 */
export function isOnSale(
  price: string,
  compareAtPrice: string | null
): boolean {
  if (!compareAtPrice) return false;
  return parseFloat(compareAtPrice) > parseFloat(price);
}
