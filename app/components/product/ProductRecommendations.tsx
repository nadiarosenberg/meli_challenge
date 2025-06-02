import { Product } from "../../entities/product/types";
import ProductCard from './ProductCard';

interface ProductRecommendationsProps {
  relatedProducts: Product[];
  storeProducts: Product[];
  storeName: string,
}

export default function ProductRecommendations({
  relatedProducts,
  storeProducts,
  storeName
}: ProductRecommendationsProps) {
  return (
    <div className="container mx-auto mt-8 space-y-8">
      {/* Related products */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Productos relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map(product => (
            <ProductCard key={product.id} product={product} variant="large" />
          ))}
        </div>
      </div>

      {/* Store products */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Productos de {storeName}</h2>
        <div className="grid grid-cols-2 gap-4">
          {storeProducts.map(product => (
            <ProductCard key={product.id} product={product} variant="small" />
          ))}
        </div>
      </div>
    </div>
  );
}