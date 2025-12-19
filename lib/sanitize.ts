import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * This is safe to use with untrusted HTML like Shopify product descriptions
 */
export function sanitizeHtml(html: string): string {
  // For server-side rendering, we need to create a JSDOM window
  if (typeof window === 'undefined') {
    const { window } = new JSDOM('');
    // @ts-ignore - JSDOM window is compatible with DOMPurify
    const purify = DOMPurify(window);
    return purify.sanitize(html, {
      ALLOWED_TAGS: [
        'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'blockquote'
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    });
  }

  // For client-side, use DOMPurify directly
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'blockquote'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}
