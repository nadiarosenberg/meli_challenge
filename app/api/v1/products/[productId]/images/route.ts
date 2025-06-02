import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ProductImages } from "../../../../../entities/product/types";
import { ProductIdInput } from "../../../../../entities/product/schemas";
import { validateOrThrowSync } from '../../../../../../lib/utils';

function getProductImages(productId: string) : string[] | null {
  const dataPath = path.join(process.cwd(), "data", "productImages.json");
  const imagesData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as ProductImages;
  if(imagesData.productId !== productId) return null
  return imagesData.images
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync(resolvedParams, ProductIdInput)
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}