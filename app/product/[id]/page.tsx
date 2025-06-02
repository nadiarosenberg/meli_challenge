import { Suspense } from 'react';
import { getProduct, getProductImages, getPaymentMethods, getStore, getProducts } from '@/lib/api';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ImageGallery from '@/components/product/ImageGallery';
import ProductInfo from '@/components/product/ProductInfo';
import TechnicalSpecs from '@/components/product/TechnicalSpecs';
import Description from '@/components/product/Description';
import StoreInfo from '@/components/product/StoreInfo';
import PaymentMethods from '@/components/product/PaymentMethods';
import BuySection from '@/components/product/BuySection';
import RecommendedProducts from '@/components/product/RecommendedProducts';
import { Skeleton } from '@/components/ui/skeleton';

// Required for static site generation with dynamic routes
export async function generateStaticParams() {
  const { products } = await getProducts({});
  return products.map((product) => ({
    id: product.id,
  }));
}

// Separate components for loading states
function LoadingProductInfo() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <div className="flex gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-10 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const productId = (await params).id;
  const product = await getProduct(productId);
  const images = await getProductImages(productId);
  const paymentMethods = await getPaymentMethods(productId);
  const store = await getStore(product.storeData.id);
  
  const relatedProducts = await getProducts({
    secondaryCategoryId: product.categories.secondaryId,
    excludeId: productId,
    limit: 5
  });
  
  const storeProducts = await getProducts({
    storeId: product.storeData.id,
    excludeId: productId,
    limit: 5
  });
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="text-sm text-gray-500 mb-4">
          {product.categories.mainName} &gt; {product.categories.secondaryName}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Image gallery */}
          <div className="lg:col-span-5">
            <ImageGallery images={images} mainImage={product.mainImage} />
          </div>
          
          {/* Middle column - Product info */}
          <div className="lg:col-span-4">
            <Suspense fallback={<LoadingProductInfo />}>
              <ProductInfo product={product} />
            </Suspense>
            
            <TechnicalSpecs product={product} />
            <Description product={product} />
          </div>
          
          {/* Right column - Store info, payment methods, etc. */}
          <div className="lg:col-span-3 space-y-4">
            <BuySection />
            <StoreInfo store={store} />
            <PaymentMethods paymentMethods={paymentMethods} />
          </div>
        </div>
        
        <RecommendedProducts 
          title="Productos relacionados" 
          products={relatedProducts.products} 
        />
        
        <RecommendedProducts 
          title={`Productos de ${store.name}`} 
          products={storeProducts.products} 
        />
      </main>
      <Footer />
    </>
  );
}

export default ProductDetail;
