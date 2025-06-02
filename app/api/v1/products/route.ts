import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product, PaginatedProducts, PaginationInput } from "../../../entities/product/types";
import { GetProductsInput } from "../../../entities/product/schemas";
import { validateOrThrowSync } from "../../../../lib/utils";

function getAndFilterProducts(params: PaginationInput) : PaginatedProducts {
  const dataPath = path.join(process.cwd(), "data", "products.json");
  const productData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Product[];
  const products = productData.filter((product) => {
    if (params.storeId && product.storeData.id !== params.storeId) return false
    if (params.tertiaryId && product.categories.tertiaryId !== params.tertiaryId) return false
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

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const page = params.get("page");
    const limit = params.get("limit");
    const storeId = params.get("storeId");
    const tertiaryId = params.get("tertiaryId");
    const excludedId = params.get("excludedId");
    const parsedParams = validateOrThrowSync({page, limit, storeId, tertiaryId, excludedId}, GetProductsInput)
    const products = getAndFilterProducts(parsedParams)
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
