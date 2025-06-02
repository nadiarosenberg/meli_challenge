import { Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }  
) {
  try {
    const resolvedParams = await params;             
    const { productId } = resolvedParams;
    const productDataPath = path.join(process.cwd(), "data", "product.json");
    const productData = JSON.parse(fs.readFileSync(productDataPath, "utf8")) as Product;
    if (productData.id !== productId) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}