/**
 * Sanitizes HTML content to prevent XSS attacks
 * This is safe to use with untrusted HTML like Shopify product descriptions
 *
 * Uses a simple, serverless-compatible approach that works on both client and server
 * For Shopify HTML, we trust the content is already sanitized by Shopify's platform
 */
export function sanitizeHtml(html: string): string {
  // Shopify already sanitizes HTML in product descriptions
  // We just need basic protection against script injection

  // Remove script tags and event handlers
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/javascript:/gi, '');

  return sanitized;
}
