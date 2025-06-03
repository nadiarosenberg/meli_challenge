'use client';

import { Product } from "../../../entities/product/product.types";

interface DescriptionProps {
  product: Product;
}

export default function Description({ product }: DescriptionProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4">Descripción</h2>
      <p className="text-sm text-gray-700 whitespace-pre-line">
        {product.description}
      </p>
    </div>
  );
}