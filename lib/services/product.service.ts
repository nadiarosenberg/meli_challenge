import { PaginatedProducts, PaginationInput, Product, ProductImages } from "../../entities/product/product.types";
import fs from "fs";
import path from "path";
import { ProductPaymentMethods } from "../../entities/paymentMethods/paymentMethods.types";

export function getProductImages(productId: string) : string[] | null {
  const dataPath = path.join(process.cwd(), "data", "productImages.json");
  const imagesData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as ProductImages;
  if(imagesData.productId !== productId) return null
  return imagesData.images
}

export function getPaymentMethods(productId: string) : ProductPaymentMethods | null {
  const paymentMethodsPath = path.join(process.cwd(), "data", "paymentMethods.json");
  const paymentMethodsData = JSON.parse(fs.readFileSync(paymentMethodsPath, "utf8")) as ProductPaymentMethods;
  if(paymentMethodsData.productId !== productId) return null
  return paymentMethodsData
}

export function getProductById(productId: string) : Product | null {
  const dataPath = path.join(process.cwd(), "data", "product.json");
  const productData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Product;
  if(productData.id !== productId) return null
  return productData
}

export function getAndFilterProducts(params: PaginationInput) : PaginatedProducts {
  const dataPath = path.join(process.cwd(), "data", "products.json");
  const productData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Product[];
  const products = productData.filter((product) => {
    if (params.storeId && product.storeData.id !== params.storeId) return false
    if (params.tertiaryCategoryId && product.categories.tertiaryId !== params.tertiaryCategoryId) return false
    if(params.excludedId && product.id === params.excludedId) return false
    return true
  });
  const totalProducts = products.length
  const totalPages = Math.ceil(totalProducts / params.limit)
  return {
    page: params.page,
    limit: params.limit,
    total: totalProducts,
    totalPages,
    results: products.slice(0, params.limit)
  }
}