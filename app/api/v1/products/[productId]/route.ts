import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "../../../../entities/product/types";
import { ProductIdInput } from "../../../../entities/product/schemas";
import { validateOrThrowSync } from '../../../../../lib/utils';

function getProductById(productId: string) : Product | null {
  const dataPath = path.join(process.cwd(), "data", "product.json");
  const productData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Product;
  if(productData.id !== productId) return null
  return productData
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync(resolvedParams, ProductIdInput)
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}