"use client";

import { useState } from 'react';
import { Product } from '@/types';
import { Star } from 'lucide-react';
import ColorSelector from './ColorSelector';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const {
    title,
    rating,
    ratingVotes,
    soldAmount,
    isNew,
    isBestSelling,
    priceConfig,
    stock,
    mainDescription,
    colors
  } = product;

  const [selectedColorImage, setSelectedColorImage] = useState<string>(
    colors && colors.length > 0 ? colors[0].productImage : ''
  );

  const handleColorChange = (colorImage: string) => {
    setSelectedColorImage(colorImage);
    // Aquí puedes hacer otras cosas relacionadas con el cambio de color
    console.log("Color cambiado a", colorImage);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Categories */}
      <div className="text-sm text-gray-500">
        <p>{product.categories.mainName} &gt; {product.categories.secondaryName}</p>
      </div>
      
      {/* Tags */}
      <div className="flex gap-2">
        {isNew && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Nuevo</span>
        )}
        {isBestSelling && (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Más vendido</span>
        )}
      </div>
      
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-medium">{title}</h1>
      
      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <span className="font-medium">{rating}</span>
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1" />
        </div>
        <span className="text-sm text-gray-500">({ratingVotes} opiniones)</span>
        <span className="text-sm text-gray-500">| {soldAmount} vendidos</span>
      </div>
      
      {/* Price */}
      <div className="mt-2">
        {priceConfig.discount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 line-through">
              {priceConfig.currency} {formatPrice(priceConfig.originalPrice)}
            </span>
            <span className="text-sm text-green-600">{priceConfig.discount}% OFF</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-3xl font-medium">
            {priceConfig.currency} {formatPrice(priceConfig.price)}
          </span>
        </div>
        {priceConfig.acceptInstallments && priceConfig.installmentsAmount && (
          <div className="text-sm text-gray-700 mt-1">
            en {priceConfig.installmentsAmount} cuotas de {priceConfig.currency} {formatPrice(priceConfig.installmentsPrice || 0)}
            {!priceConfig.installmentsInterest && " sin interés"}
          </div>
        )}
      </div>
      
      {/* Color selector */}
      {colors && colors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Color: {colors.find(c => c.productImage === selectedColorImage)?.colorName || colors[0].colorName}</h3>
          <ColorSelector colors={colors} onColorChange={handleColorChange} />
        </div>
      )}
      
      {/* Main description */}
      <div className="mt-4">
        <ul className="space-y-2">
          {mainDescription.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Stock */}
      <div className="mt-2">
        <span className="text-sm text-green-600">
          Stock disponible - {stock.available} unidades
        </span>
      </div>
    </div>
  );
}
