/**
 * @jest-environment node
 */
import { GET } from '@/app/api/v1/products/route';
import { NextRequest } from 'next/server';

describe('Products API', () => {
  test('should return a list of products', async () => {
    const request = new NextRequest('http://localhost:3000/api/v1/products');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('products');
    expect(data).toHaveProperty('page');
    expect(data).toHaveProperty('limit');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('totalPages');
    expect(Array.isArray(data.products)).toBe(true);
  });

  test('should return paginated results', async () => {
    const url = new URL('http://localhost:3000/api/v1/products');
    url.searchParams.append('page', '1');
    url.searchParams.append('limit', '5');
    
    const request = new NextRequest(url);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.page).toBe(1);
    expect(data.limit).toBe(5);
    expect(data.products.length).toBeLessThanOrEqual(5);
  });

  test('should exclude product by ID', async () => {
    const excludedId = '665c946cdd3b4d6b88a2c101';
    const url = new URL('http://localhost:3000/api/v1/products');
    url.searchParams.append('excludedId', excludedId);
    
    const request = new NextRequest(url);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    const hasExcludedProduct = data.products.some((product: any) => product.id === excludedId);
    expect(hasExcludedProduct).toBe(false);
  });
});