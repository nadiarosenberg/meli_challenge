import { NextRequest, NextResponse } from "next/server";
import { parseError, validateOrThrowSync } from '../../../../../../lib/utils';
import { ProductIdInput } from "../../../../../../entities/product/product.schemas";
import { getPaymentMethods } from "../../../../../../lib/services/product.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync<{productId: string}>(resolvedParams, ProductIdInput)
    const paymentMethods = getPaymentMethods(parsedParams.productId)
    if (!paymentMethods) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error("Error fetching product payment methods:", error);
    return parseError(error)
  }
}
