import { Product } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const productDataPath = path.join(process.cwd(), "data", "product.json");
    const productData = JSON.parse(fs.readFileSync(productDataPath, "utf8")) as Product;
    if (productData.id !== productId) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    const images = Array(8).fill(productData.mainImage);
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching product images:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
