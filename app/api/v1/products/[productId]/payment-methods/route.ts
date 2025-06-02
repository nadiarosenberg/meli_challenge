import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ProductPaymentMethods } from "../../../../../entities/paymentMethods/types";
import { ProductIdInput } from "../../../../../entities/product/schemas";
import { validateOrThrowSync } from '../../../../../../lib/utils';

function getPaymentMethods(productId: string) : ProductPaymentMethods | null {
  const paymentMethodsPath = path.join(process.cwd(), "data", "paymentMethods.json");
  const paymentMethodsData = JSON.parse(fs.readFileSync(paymentMethodsPath, "utf8")) as ProductPaymentMethods;
  if(paymentMethodsData.productId !== productId) return null
  return paymentMethodsData
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync(resolvedParams, ProductIdInput)
    const paymentMethods = getPaymentMethods(parsedParams.productId)
    if (!paymentMethods) {
      return NextResponse.json(
        { error: "Payment methods not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(paymentMethods);
  } catch (error) {
    console.error("Error fetching product payment methods:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
