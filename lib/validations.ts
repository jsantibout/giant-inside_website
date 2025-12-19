import { z } from 'zod';

/**
 * Validation schemas for API requests
 */

// Cart line input validation
export const cartLineInputSchema = z.object({
  merchandiseId: z.string().min(1, 'Merchandise ID is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Cart line update input validation
export const cartLineUpdateInputSchema = z.object({
  id: z.string().min(1, 'Line ID is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Add to cart request validation
export const addToCartSchema = z.object({
  cartId: z.string().min(1, 'Cart ID is required'),
  lines: z.array(cartLineInputSchema).min(1, 'At least one line item is required'),
});

// Update cart request validation
export const updateCartSchema = z.object({
  cartId: z.string().min(1, 'Cart ID is required'),
  lines: z.array(cartLineUpdateInputSchema).min(1, 'At least one line item is required'),
});

// Remove from cart request validation
export const removeFromCartSchema = z.object({
  cartId: z.string().min(1, 'Cart ID is required'),
  lineIds: z.array(z.string()).min(1, 'At least one line ID is required'),
});

// Create cart request validation
export const createCartSchema = z.object({
  lines: z.array(cartLineInputSchema).optional().default([]),
});

// Get cart request validation
export const getCartSchema = z.object({
  cartId: z.string().min(1, 'Cart ID is required'),
});

/**
 * Helper function to validate request body and return typed data or error
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      return { success: false, error: errorMessages };
    }
    return { success: false, error: 'Validation failed' };
  }
}
