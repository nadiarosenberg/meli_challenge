/**
 * @jest-environment node
 */
import { GET } from '@/app/api/v1/products/[productId]/route';
import { NextRequest } from 'next/server';

describe('Product Detail API', () => {
  test('should return product details', async () => {
    const productId = '665c946cdd3b4d6b88a2c101';
    const request = new NextRequest(`http://localhost:3000/api/v1/products/${productId}`);
    const response = await GET(request, { params: { productId } });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('id', productId);
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('priceConfig');
    expect(data).toHaveProperty('mainImage');
  });

  test('should return 404 for non-existent product', async () => {
    const productId = 'nonexistent-id';
    const request = new NextRequest(`http://localhost:3000/api/v1/products/${productId}`);
    const response = await GET(request, { params: { productId } });
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data).toHaveProperty('error', 'Product not found');
  });
});