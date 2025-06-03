import { NextRequest, NextResponse } from "next/server";
import { parseError, validateOrThrowSync } from '../../../../../../lib/utils';
import { ProductIdInput } from "../../../../../../entities/product/product.schemas";
import { getProductImages } from "../../../../../../lib/services/product.service";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string } >}
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync<{productId: string}>(resolvedParams, ProductIdInput)
    const images = getProductImages(parsedParams.productId)
    if (!images) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching product images:", error);
    return parseError(error)
  }
}