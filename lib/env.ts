import { z } from 'zod';

/**
 * Server-side environment variables schema
 * These should NEVER be exposed to the client
 */
const serverEnvSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z.string().min(1, 'SHOPIFY_STORE_DOMAIN is required'),
  SHOPIFY_STOREFRONT_API_TOKEN: z.string().min(1, 'SHOPIFY_STOREFRONT_API_TOKEN is required'),
  SHOPIFY_API_VERSION: z.string().default('2024-07'),
});

/**
 * Client-side environment variables schema
 * These are safe to expose to the browser (prefixed with NEXT_PUBLIC_)
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_FORMSPREE_CONTACT_FORM: z.string().optional(),
  NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

/**
 * Validates and returns server environment variables
 * Throws a descriptive error if validation fails
 */
export function getServerEnv() {
  try {
    return serverEnvSchema.parse({
      SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
      SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
      SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((e) => `  - ${e.path.join('.')}: ${e.message}`).join('\n');
      throw new Error(
        `❌ Invalid server environment variables:\n${missingVars}\n\n` +
        `Please check your .env.local file and ensure all required variables are set.\n` +
        `See .env.example for reference.`
      );
    }
    throw error;
  }
}

/**
 * Validates and returns client environment variables
 * Returns validated values or empty object if validation fails
 */
export function getClientEnv() {
  try {
    return clientEnvSchema.parse({
      NEXT_PUBLIC_FORMSPREE_CONTACT_FORM: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM,
      NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM: process.env.NEXT_PUBLIC_FORMSPREE_PARTNERSHIPS_FORM,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    });
  } catch (error) {
    console.warn('Client environment variables validation failed:', error);
    return {};
  }
}
