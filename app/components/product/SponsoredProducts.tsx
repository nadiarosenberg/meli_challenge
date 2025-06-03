'use client';
import { Product } from '../../../entities/product/product.types';
import ProductCard from './ProductCard';

interface SponsoredProductsProps {
  products: Product[];
}

export default function SponsoredProducts({ products }: SponsoredProductsProps) {
  return (
    <div className="mt-12">
        <h2 className="text-lg font-semibold mb-3">Productos recomendados</h2>
      <h4 className="text-sm text-gray-400 mb-3"> Patrocinado</h4>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="small" />
        ))}
      </div>
    </div>
  );
}