import { Product, ProductPaymentMethods, ProductsResponse, Store } from "@/types";

// API client functions
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
    secondaryCategoryId?: string;
    excludeId?: string;
  } = {}
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  
  if (options.page) params.append('page', options.page.toString());
  if (options.limit) params.append('limit', options.limit.toString());
  if (options.storeId) params.append('storeId', options.storeId);
  if (options.secondaryCategoryId) params.append('secondaryCategoryId', options.secondaryCategoryId);
  if (options.excludeId) params.append('excludeId', options.excludeId);
  
  const response = await fetch(`http://localhost:3000/api/v1/products?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}