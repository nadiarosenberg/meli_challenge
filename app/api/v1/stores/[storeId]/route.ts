
import { NextRequest, NextResponse } from "next/server";
import { parseError, validateOrThrowSync } from "../../../../../lib/utils";
import { getStoreById } from "../../../../../lib/services/store.service";
import { StoreIdInput } from "../../../../../entities/store/store.schemas";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync<{storeId: string}>(resolvedParams, StoreIdInput)
    const store = getStoreById(parsedParams.storeId)
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(store);
  } catch (error: any) {
    console.error("Error fetching store:", error);
    return parseError(error)
  }
}
