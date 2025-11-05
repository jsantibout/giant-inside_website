import Image from 'next/image';

interface ProductCardProps {
  name: string;
  price?: number;
  image?: string;
  comingSoon?: boolean;
}

export default function ProductCard({ name, price, image, comingSoon = true }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden bg-gray-100 rounded-sm">
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
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
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-montserrat font-bold text-lg mb-2">{name}</h3>
        {price && (
          <p className="text-xl font-bold text-gold mb-3">${price.toFixed(2)}</p>
        )}

        {comingSoon ? (
          <div className="text-sm text-gray-600">
            Available Soon
          </div>
        ) : (
          <div id={`product-component-${name.replace(/\s+/g, '-').toLowerCase()}`}>
            {/* Shopify Buy Button will be inserted here */}
          </div>
        )}
      </div>
    </div>
  );
}
