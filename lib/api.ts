import { ProductPaymentMethods } from "../entities/paymentMethods/paymentMethods.types";
import { PaginatedProducts, Product } from "../entities/product/product.types";
import { Store } from "../entities/store/store.types";

export async function getProduct(productId: string): Promise<Product> {
  const response = await fetch(`http://localhost:3000/api/v1/products/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();  
}

export async function getProductImages(productId: string): Promise<string[]> {
  const response = await fetch(`http://localhost:3000/api/v1/products/${productId}/images`);
  if (!response.ok) {
    throw new Error('Failed to fetch product images');
  }
  return response.json();
}

export async function getPaymentMethods(productId: string): Promise<ProductPaymentMethods> {
  const response = await fetch(`http://localhost:3000/api/v1/products/${productId}/payment-methods`);
  if (!response.ok) {
    throw new Error('Failed to fetch payment methods');
  }
  return response.json();
}

export async function getStore(storeId: string): Promise<Store> {
  const response = await fetch(`http://localhost:3000/api/v1/stores/${storeId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  return response.json();
}

export async function getProducts(
  options: {
    page?: number;
    limit?: number;
    storeId?: string;
    tertiaryCategoryId?: string;
    excludedId?: string;
  } = {}
): Promise<PaginatedProducts> {
  const params = new URLSearchParams();
  if (options.page) params.append('page', options.page.toString());
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.storeId) params.append('storeId', options.storeId);
  if (options.tertiaryCategoryId) params.append('tertiaryCategoryId', options.tertiaryCategoryId);
  if (options.excludedId) params.append('excludedId', options.excludedId);
  const response = await fetch(`http://localhost:3000/api/v1/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}


