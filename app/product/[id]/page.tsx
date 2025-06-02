import { Suspense } from 'react';
import { Skeleton } from '../../components/ui/skeleton';
import { getPaymentMethods, getProduct, getProductImages, getProducts, getStore } from '../../../lib/api';
import Header from '../../components/ui/header';
import Description from '../../components/product/Description';
import ImageGallery from '../../components/product/ImageGallery';
import ProductInfo from '../../components/product/ProductInfo';
import PaymentMethods from '../../components/product/PaymentMethods';
import ProductRecommendations from '../../components/product/ProductRecommendations';
import ProductTechnicalSpecs from '../../components/product/ProductTechnicalSpecs';
import SponsoredProducts from '../../components/product/SponsoredProducts';
import PurchaseInfo from '../../components/product/PurchaseInfo';

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
    tertiaryId: product.categories.tertiaryId,
    excludedId: productId,
    limit: 3
  });

  const storeProducts = await getProducts({
    storeId: product.storeData.id,
    excludedId: productId,
    limit: 2
  });

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-700 mb-4 bg-gray-100 p-2 rounded">
            <a href="#" className="hover:underline mr-2 text-blue-500">Volver al listado</a>
            <span className="mr-2">|</span>
            <span className="ml-2">
              <a href="#" className="hover:underline text-blue-500">{product.categories.secondaryName}</a> &gt;{' '}
              <a href="#" className="hover:underline text-blue-500">{product.categories.tertiaryName}</a> &gt;{' '}
              <a href="#" className="hover:underline text-blue-500">{product.storeData.name}</a>
            </span>
          </div>
  
          <div className="flex flex-col lg:flex-row gap-6 bg-white shadow-lg p-4 rounded">
            {/* Left section */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Gallery and product info */}
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <ImageGallery images={images} mainImage={product.mainImage} />
                </div>
                <div className="flex-1">
                  <Suspense fallback={<LoadingProductInfo />}>
                    <ProductInfo product={product} />
                  </Suspense>
                </div>
              </div>
  
              {/* Recommendations, Specs, Description */}
              <ProductRecommendations
                relatedProducts={relatedProducts.results}
                storeProducts={storeProducts.results}
                storeName={store.name}
              />
  
              <div className="bg-white shadow p-4 rounded space-y-6">
                <ProductTechnicalSpecs product={product} />
                <Description product={product} />
              </div>
            </div>
  
            {/* Right column */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
              <PurchaseInfo store={store} product={product} />
              <PaymentMethods paymentMethods={paymentMethods} />
              <SponsoredProducts products={relatedProducts.results}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
