import { ProductPaymentMethods } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const paymentMethodsPath = path.join(process.cwd(), "data", "paymentMethods.json");
    const paymentMethodsData = JSON.parse(fs.readFileSync(paymentMethodsPath, "utf8")) as ProductPaymentMethods;
    if (paymentMethodsData.productId !== productId) {
      return NextResponse.json(
        { error: "Payment methods not found for this product" },
        { status: 404 }
      );
    }
    return NextResponse.json(paymentMethodsData);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
