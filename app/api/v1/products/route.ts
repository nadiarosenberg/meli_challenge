import { NextRequest, NextResponse } from "next/server";
import { parseError, validateOrThrowSync } from "../../../../lib/utils";
import { getAndFilterProducts } from "../../../../lib/services/product.service";
import { PaginationInput } from "../../../../entities/product/product.types";
import { GetProductsInput } from "../../../../entities/product/product.schemas";


export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams
    const page = params.get("page");
    const limit = params.get("limit");
    const storeId = params.get("storeId");
    const tertiaryCategoryId = params.get("tertiaryCategoryId");
    const excludedId = params.get("excludedId");
    const parsedParams = validateOrThrowSync<PaginationInput>({page, limit, storeId, tertiaryCategoryId, excludedId}, GetProductsInput)
    const products = getAndFilterProducts(parsedParams)
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return parseError(error)
  }
}
