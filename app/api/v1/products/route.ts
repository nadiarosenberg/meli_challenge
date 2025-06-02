import { Product, ProductPreview, ProductsResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const storeId = searchParams.get("storeId");
    const secondaryCategoryId = searchParams.get("secondaryCategoryId");
    const excludeId = searchParams.get("excludeId");
    const productDataPath = path.join(process.cwd(), "data", "product.json");
    const productData = JSON.parse(fs.readFileSync(productDataPath, "utf8")) as Product;
    let products: ProductPreview[] = Array(10)
      .fill(null)
      .map((_, index) => ({
        id: index === 0 ? productData.id : `665c946cdd3b4d6b88a2c${101 + index}`,
        title:
          index === 0
            ? productData.title
            : `Samsung Galaxy A${55 + index} 5G Dual SIM 256 GB azul oscuro 8 GB RAM`,
        storeData: productData.storeData,
        mainImage: productData.mainImage,
        priceConfig: {
          price: productData.priceConfig.price,
          currency: productData.priceConfig.currency,
        },
        isBestSelling: productData.isBestSelling,
        isNew: productData.isNew,
      }));
    if (excludeId) {
      products = products.filter((product) => product.id !== excludeId);
    }
    const filteredProducts = products.filter((product) => {
      if (storeId && product.storeData.id !== storeId) return false;
      if (secondaryCategoryId && productData.categories.secondaryId !== secondaryCategoryId) return false;
      return true;
    });
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const response: ProductsResponse = {
      page,
      limit,
      total,
      totalPages,
      products: paginatedProducts,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
