'use client';

import Link from 'next/link';
import Image from 'next/image';
import { mapCurrency } from '../../../lib/utils';

export default function ProductInfo({ product }: { product: any }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'text-blue-500' : 'text-grey-500'}
      >
        &#9733;
      </span>
    ));
  };

  return (
    <div className="flex flex-col" style={{ minWidth: '400px' }}>
      <div className="mb-3">
        <Link
          href={`/store/${product.storeData.id}`}
          className="text-blue-600 hover:underline text-sm whitespace-nowrap block"
        >
          Visita la tienda oficial de {product.storeData.name}
        </Link>
      </div>

    <div className="flex flex-wrap gap-2 text-sm text-gray-400 mb-3">
      {product.isNew && (
        <span className="whitespace-nowrap">
          Nuevo
        </span>
      )}
                  <span className="mr-2">|</span>
      {product.soldAmount > 0 && (
        <span className="whitespace-nowrap">
          +{product.soldAmount} vendidos
        </span>
      )}
    </div>

      <div className="flex items-center gap-4 mb-3">
    {product.isBestSelling && (
      <span className="bg-orange-500 text-white uppercase px-3 py-1 rounded whitespace-nowrap font-semibold text-sm">
        Más vendido
      </span>
    )}
    {product.categories?.tertiaryPosition && product.categories?.tertiaryName && (
      <span
        className="text-blue-600 hover:underline whitespace-nowrap cursor-default text-sm"
        onClick={e => e.preventDefault()}
        title="Categoría"
      >
        {product.categories.tertiaryPosition}° en {product.categories.tertiaryName}
      </span>
    )}
    </div>

      <h3 className="text-2xl font-semibold leading-tight line-clamp-2 mb-3">
        {product.title}
      </h3>

      {product.rating !== undefined && product.ratingVotes !== undefined && (
        <div className="flex items-center text-sm text-gray-400 gap-2 mb-4">
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <div className="flex">{renderStars(product.rating)}</div>
          <span>({product.ratingVotes} votos)</span>
        </div>
      )}

<div className="mb-4">
  {product.priceConfig.originalPrice && (
    <div className="text-gray-400 text-sm line-through mb-1">
      {mapCurrency(product.priceConfig.currency)} {product.priceConfig.originalPrice}
    </div>
  )}

  <div className="flex items-center gap-2">
    <span className="text-2xl text-gray-700 leading-none">
    {mapCurrency(product.priceConfig.currency)} {product.priceConfig.price}
    </span>

    {product.priceConfig.discount && (
      <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
        <span>{Math.round(product.priceConfig.discount * 100)}% OFF</span>
        <button
          type="button"
          aria-label="Información sobre descuento"
          className="w-4 h-4 border border-green-600 rounded-full flex items-center justify-center text-green-600 text-xs font-bold"
          onClick={(e) => e.stopPropagation()}
        >
          ?
        </button>
      </div>
    )}
  </div>

  {product.priceConfig.acceptInstallments &&
    product.priceConfig.installmentsAmount &&
    product.priceConfig.installmentsPrice && (
      <div className="mt-1 text-sm">
        <span className="text-gray-500">en </span>
        <span className="text-green-600 font-light">
          {product.priceConfig.installmentsAmount} cuotas de {mapCurrency(product.priceConfig.currency)} {product.priceConfig.installmentsPrice}
        </span>
        <span className="text-green-600 font-light"> sin interés</span>
      </div>
    )}
  </div>

  {product.colors?.length > 0 && (
    <div className="mb-4">
      <div className="text-xs text-gray-700 font-semibold mb-1">Color: {product.colors[0].colorName}</div>
      <Image
        src={product.colors[0].productImage}
        alt={product.colors[0].colorName}
        width={28}
        height={28}
        className="rounded-full border border-gray-300"
      />
    </div>
  )}

  <div className="text-sm font-semibold text-gray-900 mb-2">
    Lo que tienes que saber sobre este producto
  </div>

  {product.mainDescription && (
  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3">
    {product.mainDescription.map((item: string, idx: number) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
  )}

  <Link
    href="#ProductTechnicalSpecs"
    className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
  >
    Ver características
  </Link>

    </div>
  );
}
