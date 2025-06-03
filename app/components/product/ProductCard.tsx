'use client';
import Image from 'next/image';
import Link from 'next/link';
import { mapCurrency } from '../../../lib/utils';
import { Product } from '../../../entities/product/product.types';

interface ProductCardProps {
  product: Product
  variant?: 'small' | 'large';
}

export default function ProductCard({ product, variant = 'large' }: ProductCardProps) {
  const imageHeightClass = variant === 'small' ? 'h-24' : 'h-40';
  const titleClass = variant === 'small' ? 'text-xs h-8' : 'text-sm h-10';
  const paddingClass = variant === 'small' ? 'p-3' : 'p-4';

  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg hover:shadow-md transition-shadow">

        {/* Image section */}
        <div className={`relative ${imageHeightClass} bg-white ${paddingClass}`}>
          <Image
            src={product.mainImage}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className={paddingClass}>
          <h3 className={`font-medium line-clamp-2 ${titleClass}`}>{product.title}</h3>

          {/* Price and extra info */}
          <div className="mt-2">
            <div className="flex flex-col">

              <span className="text-base text-gray-900">
                {mapCurrency(product.priceConfig.currency)} {product.priceConfig.price}
              </span>

              {product.priceConfig.acceptInstallments &&
                product.priceConfig.installmentsAmount &&
                product.priceConfig.installmentsPrice &&
                product.priceConfig.installmentsInterest === false && (
                  <div className="text-sm mt-1">
                    <span className="text-gray-500">en </span>
                    <span className="text-green-600 font-light">
                      {product.priceConfig.installmentsAmount} cuotas de {mapCurrency(product.priceConfig.currency)} {product.priceConfig.installmentsPrice}
                    </span>
                    <span className="text-green-600 font-light"> sin interés</span>
                  </div>
                )}

              {product.freeShipment && (
                <span className="text-sm text-green-600 font-light mt-1">
                  Envío gratis
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
