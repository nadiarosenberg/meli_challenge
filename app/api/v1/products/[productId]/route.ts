import { NextRequest, NextResponse } from "next/server";
import { parseError, validateOrThrowSync } from '../../../../../lib/utils';
import { getProductById } from "../../../../../lib/services/product.service";
import { ProductIdInput } from "../../../../../entities/product/product.schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync<{productId: string}>(resolvedParams, ProductIdInput)
    const product = getProductById(parsedParams.productId)             
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return parseError(error)
  }
}