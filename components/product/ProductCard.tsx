'use client';
import { ProductPreview } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: ProductPreview;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg hover:shadow-md transition-shadow">
        <div className="relative h-40 bg-white p-4">
          <Image
            src={product.mainImage}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium line-clamp-2 h-10">{product.title}</h3>
          <div className="mt-2">
            <div className="flex items-center">
              <span className="text-lg font-medium">
                {product.priceConfig.currency} {formatPrice(product.priceConfig.price)}
              </span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {product.isNew && (
              <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Nuevo</span>
            )}
            {product.isBestSelling && (
              <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">Más vendido</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}