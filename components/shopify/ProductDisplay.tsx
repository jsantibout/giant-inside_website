'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShopifyProduct, ShopifyVariant } from '@/lib/types/shopify';
import { formatPrice } from '@/lib/shopify';
import { sanitizeHtml } from '@/lib/sanitize';
import AddToCartButton from '@/components/shopify/AddToCartButton';
import VariantSelector from '@/components/shopify/VariantSelector';
import StockIndicator from '@/components/shopify/StockIndicator';
import QuantitySelector from '@/components/shopify/QuantitySelector';

interface ProductDisplayProps {
  product: ShopifyProduct;
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
  const variants = product.variants.edges.map((edge) => edge.node);
  const images = product.images.edges.map((edge) => edge.node);

  // Early return for products with no variants
  if (variants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No variants available for this product.</p>
      </div>
    );
  }

  // Initialize selected options with the first variant's options
  const firstVariant = variants[0];
  const initialOptions: Record<string, string> = {};
  firstVariant.selectedOptions.forEach((option) => {
    initialOptions[option.name] = option.value;
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Find the currently selected variant based on selected options
  const selectedVariant = useMemo(() => {
    return variants.find((variant) => {
      return variant.selectedOptions.every((option) => {
        return selectedOptions[option.name] === option.value;
      });
    });
  }, [variants, selectedOptions]);

  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Handle image selection
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Handle keyboard navigation for thumbnails
  const handleThumbnailKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(index);
    }
  };

  // Handle image load error
  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  // Use selected variant or fallback to first variant
  const displayVariant = selectedVariant || firstVariant;

  const price = formatPrice(
    displayVariant.price.amount,
    displayVariant.price.currencyCode
  );
  const compareAtPrice = displayVariant.compareAtPrice
    ? formatPrice(
        displayVariant.compareAtPrice.amount,
        displayVariant.compareAtPrice.currencyCode
      )
    : null;

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        {images.length > 0 ? (
          <>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              {!imageError[selectedImageIndex] ? (
                <Image
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => handleImageError(selectedImageIndex)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Image failed to load</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-3" role="tablist" aria-label="Product images">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    role="tab"
                    aria-selected={index === selectedImageIndex}
                    aria-label={`View image ${index + 1}`}
                    onClick={() => handleImageClick(index)}
                    onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
                    className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                      index === selectedImageIndex
                        ? 'border-black shadow-md'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    {!imageError[index] ? (
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 20vw, 10vw"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Error</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg">No image available</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <div className="flex-1">
          <h1 className="font-bebas text-4xl md:text-5xl mb-4">
            {product.title}
          </h1>

          {/* Price */}
          <div className="mb-6">
            {compareAtPrice && (
              <span className="text-gray-500 line-through mr-3 text-lg">
                {compareAtPrice}
              </span>
            )}
            <span className="text-3xl font-bold">
              {price}
            </span>
            {compareAtPrice && (
              <span className="ml-3 inline-block bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
                SALE
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <StockIndicator availableForSale={displayVariant.availableForSale} />
          </div>

          {/* Variant Selector (Sizes/Colors) */}
          {variants.length > 1 && (
            <div className="mb-8">
              <VariantSelector
                variants={variants}
                selectedOptions={selectedOptions}
                onOptionChange={handleOptionChange}
              />
            </div>
          )}

          {/* Quantity Selector */}
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />

          {/* Description */}
          <div className="mb-8 prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml) }} />
          </div>

          {/* Product Details */}
          {(product.productType || product.tags.length > 0) && (
            <div className="mb-8 border-t border-gray-200 pt-6 space-y-3 text-sm">
              {product.productType && (
                <div>
                  <span className="font-bold">Type:</span>{' '}
                  <span className="text-gray-600">{product.productType}</span>
                </div>
              )}
              {product.tags.length > 0 && (
                <div>
                  <span className="font-bold">Tags:</span>{' '}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          variantId={displayVariant.id}
          availableForSale={displayVariant.availableForSale}
          quantity={quantity}
        />
      </div>
    </div>
  );
}
