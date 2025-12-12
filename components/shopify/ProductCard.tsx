import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/lib/types/shopify';
import { formatPrice } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;

  const price = firstVariant
    ? formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode)
    : null;

  const compareAtPrice = firstVariant?.compareAtPrice
    ? formatPrice(
        firstVariant.compareAtPrice.amount,
        firstVariant.compareAtPrice.currencyCode
      )
    : null;

  const isOnSale = compareAtPrice && parseFloat(firstVariant.compareAtPrice!.amount) > parseFloat(firstVariant.price.amount);

  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}

        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 text-sm font-bold rounded">
            SALE
          </div>
        )}

        {/* Out of Stock Badge */}
        {!product.availableForSale && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 font-bold rounded">
              OUT OF STOCK
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-montserrat font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          {compareAtPrice && (
            <span className="text-gray-500 line-through text-sm">
              {compareAtPrice}
            </span>
          )}
          {price && (
            <span className={`font-bold ${isOnSale ? 'text-red-600' : 'text-black'}`}>
              {price}
            </span>
          )}
        </div>

        {product.vendor && (
          <p className="text-sm text-gray-500 mt-1">{product.vendor}</p>
        )}
      </div>
    </Link>
  );
}
