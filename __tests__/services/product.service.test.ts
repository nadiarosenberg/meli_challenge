import fs from 'fs';
import {
  getProductImages,
  getPaymentMethods,
  getProductById,
  getAndFilterProducts
} from '../../lib/services/product.service';
import { mockedImages, mockedPaymentMethods, mockedProducts } from '../mocks/product.mock';


jest.mock('fs');
const mockedFs = fs as unknown as {
  readFileSync: jest.Mock;
};

describe('getProductImages', () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockedImages));
  });

  it('should return product images if id matches', () => {
    const result = getProductImages('123');
    expect(result).toEqual(["imageMock"]);
  });
  it('should return null if id does not match', () => {
    const result = getProductImages('345');
    expect(result).toBeNull();
  });
});

describe('getPaymentMethods', () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockedPaymentMethods))
  });

  it('should return product methods if id matches', () => {
    const result = getPaymentMethods('123');
    expect(result).toEqual(mockedPaymentMethods);
  })
  it('should return null if id does not match', () => {
    const result = getPaymentMethods('345');
    expect(result).toBeNull();
  });
});

describe('getProductById', () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    mockedFs.readFileSync.mockReturnValueOnce(JSON.stringify(mockedProducts[0]));
  });

  it('should return product if id matches', () => {
    const result = getProductById('123');
    expect(result).toEqual(mockedProducts[0]);
  });
  it('should return null if id does not match', () => {
    const result = getProductById('345');
    expect(result).toBeNull();
  });
});

describe("getAndFilterProducts", () => {
  beforeEach(() => {
    mockedFs.readFileSync.mockReset();
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(mockedProducts));
  });
  it("should return all products if no filters are provided", () => {
    const result = getAndFilterProducts({ page: 1, limit: 10 });
    expect(result.total).toBe(3);
    expect(result.results.length).toBe(3);
  });
  it("should filter by storeId", () => {
    const result = getAndFilterProducts({ page: 1, limit: 10, storeId: "store1" });
    expect(result.total).toBe(2);
    expect(result.results.every(p => p.storeData.id === "store1")).toBe(true);
  });
  it("should filter by tertiaryCategoryId", () => {
    const result = getAndFilterProducts({ page: 1, limit: 10, tertiaryCategoryId: "cat2" });
    expect(result.total).toBe(1);
    expect(result.results[0].categories.tertiaryId).toBe("cat2");
  });
  it("should exclude a product by excludedId", () => {
    const result = getAndFilterProducts({ page: 1, limit: 10, excludedId: "123" });
    expect(result.total).toBe(2);
    expect(result.results.find(p => p.id === "123")).toBeUndefined();
  });
  it("should return empty result when no products match filters", () => {
    const result = getAndFilterProducts({
      page: 1,
      limit: 10,
      storeId: "not-found",
    });
    expect(result.total).toBe(0);
    expect(result.results.length).toBe(0);
  });
});


