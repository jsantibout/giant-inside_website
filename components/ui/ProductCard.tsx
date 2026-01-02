import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price?: number;
  image?: string;
  comingSoon?: boolean;
  handle?: string;
  availableForSale?: boolean;
}

export default function ProductCard({
  name,
  price,
  image,
  comingSoon = false,
  handle,
  availableForSale = true
}: ProductCardProps) {
  const content = (
    <div className="group relative overflow-hidden bg-gray-100 rounded-sm cursor-pointer">
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300">
            <span className="text-gray-500 font-bebas text-2xl">PRODUCT IMAGE</span>
          </div>
        )}

        {comingSoon && (
          <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 font-montserrat font-bold text-xs uppercase">
            Coming Soon
          </div>
        )}

        {!comingSoon && !availableForSale && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 font-montserrat font-bold text-xs uppercase">
            Sold Out
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-montserrat font-bold text-lg mb-2">{name}</h3>
        {price !== undefined && (
          <p className="text-xl font-bold text-gold mb-3">${price.toFixed(2)}</p>
        )}

        {comingSoon ? (
          <div className="text-sm text-gray-600">
            Available Soon
          </div>
        ) : (
          <div className="text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
            View Details →
          </div>
        )}
      </div>
    </div>
  );

  // If there's a handle (product link), wrap in Link component
  if (handle && !comingSoon) {
    return <Link href={`/products/${handle}`}>{content}</Link>;
  }

  return content;
}
