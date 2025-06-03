import { NextRequest } from "next/server";
import { mockedPaymentMethods, mockedProducts } from "../mocks/product.mock";
import { GET  as getProductByIdRoute} from "../../app/api/v1/products/[productId]/route";
import { GET  as getProductImagesRoute} from "../../app/api/v1/products/[productId]/images/route";
import { GET  as getProductPaymentMethodRoute} from "../../app/api/v1/products/[productId]/payment-methods/route";

const req = {} as unknown as NextRequest;
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      body: data,
    })),
  },
}));
jest.mock('../../lib/services/product.service', () => ({
  getProductById: jest.fn((id) => (id === '123' ? mockedProducts[0] : null)),
  getProductImages: jest.fn((id) => (id === '123' ? ["imageMock"] : null)),
  getPaymentMethods: jest.fn((id) => (id === '123' ? {productId: "123", methods: [{method: "visa", type: "creditCard"}]} : null)),
  getProducts: jest.fn(() => ({
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
    results: mockedProducts
  }))
}));

describe('GET products/[productId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('happy path: should return product', async () => {
    const params = Promise.resolve({ productId: '123' });
    const response = await getProductByIdRoute(req, { params });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedProducts[0]);
  });
  it('should return 404 if product not found', async () => {
    const params = Promise.resolve({ productId: "345" });
    const response = await getProductByIdRoute(req, { params });
    expect(response.status).toBe(404);
  });
  it('should return 400 on validation error', async () => {
    const params = Promise.resolve({ productId: null });
    const response = await getProductByIdRoute(req, { params });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid input" });
  });
});

describe('GET products/[productId]/payment-methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('happy path: should return payment methods', async () => {
    const params = Promise.resolve({ productId: '123' });
    const response = await getProductPaymentMethodRoute(req, { params });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedPaymentMethods);
  });
  it('should return 404 if product not found', async () => {
    const params = Promise.resolve({ productId: "345" });
    const response = await getProductPaymentMethodRoute(req, { params });
    expect(response.status).toBe(404);
  });
  it('should return 400 on validation error', async () => {
    const params = Promise.resolve({ productId: null });
    const response = await getProductPaymentMethodRoute(req, { params });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid input" });
  });
});

describe('GET products/[productId]/images', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('happy path: should return product images', async () => {
    const params = Promise.resolve({ productId: '123' });
    const response = await getProductImagesRoute(req, { params });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(["imageMock"]);
  });
  it('should return 404 if product not found', async () => {
    const params = Promise.resolve({ productId: "345" });
    const response = await getProductImagesRoute(req, { params });
    expect(response.status).toBe(404);
  });
  it('should return 400 on validation error', async () => {
    const params = Promise.resolve({ productId: null });
    const response = await getProductImagesRoute(req, { params });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid input" });
  });
});