import { GET } from '../../app/api/v1/stores/[storeId]/route';
import { NextRequest } from 'next/server';
import { mockedStore } from '../mocks/store.mock';

const req = {} as unknown as NextRequest;
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      body: data,
    })),
  },
}));
jest.mock('../../lib/services/store.service', () => ({
  getStoreById: jest.fn((id) => (id === '123' ? mockedStore : null)),
}));

describe('GET stores/[storeId]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('happy path: should return store', async () => {
    const params = Promise.resolve({ storeId: '123' });
    const response = await GET(req, { params });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockedStore);
  });
  it('should return 404 if store not found', async () => {
    const params = Promise.resolve({ storeId: "345" });
    const response = await GET(req, { params });
    expect(response.status).toBe(404);
  });
  it('should return 400 on validation error', async () => {
    const params = Promise.resolve({ storeId: null });
    const response = await GET(req, { params });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "invalid input" });
  });
});