import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductByHandle, formatPrice } from '@/lib/shopify';
import { sanitizeHtml } from '@/lib/sanitize';
import AddToCartButton from '@/components/shopify/AddToCartButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const firstImage = product.images.edges[0]?.node;

  return {
    title: `${product.title} | Giant Inside`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: firstImage ? [{ url: firstImage.url, alt: firstImage.altText || product.title }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const firstVariant = product.variants.edges[0]?.node;

  // If product has no variants, show not found
  if (!firstVariant) {
    notFound();
  }

  const images = product.images.edges.map((edge) => edge.node);
  const price = formatPrice(
    firstVariant.price.amount,
    firstVariant.price.currencyCode
  );
  const compareAtPrice = firstVariant.compareAtPrice
    ? formatPrice(
        firstVariant.compareAtPrice.amount,
        firstVariant.compareAtPrice.currencyCode
      )
    : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {images.length > 0 ? (
                <>
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={images[0].url}
                      alt={images[0].altText || product.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {images.slice(1, 5).map((image, index) => (
                        <div
                          key={image.id}
                          className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                        >
                          <Image
                            src={image.url}
                            alt={image.altText || `${product.title} ${index + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 12.5vw"
                          />
                        </div>
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
                  {firstVariant.availableForSale ? (
                    <span className="inline-flex items-center text-green-600 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-600 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8 prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.descriptionHtml) }} />
                </div>

                {/* Product Details */}
                {(product.vendor || product.productType || product.tags.length > 0) && (
                  <div className="mb-8 border-t border-gray-200 pt-6 space-y-3 text-sm">
                    {product.vendor && (
                      <div>
                        <span className="font-bold">Brand:</span>{' '}
                        <span className="text-gray-600">{product.vendor}</span>
                      </div>
                    )}
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
                variantId={firstVariant.id}
                availableForSale={firstVariant.availableForSale}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
