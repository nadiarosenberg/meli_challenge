'use client';
import { ProductPreview } from '@/types';
import ProductCard from './ProductCard';

interface RecommendedProductsProps {
  title: string;
  products: ProductPreview[];
}

export default function RecommendedProducts({ title, products }: RecommendedProductsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-medium mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}