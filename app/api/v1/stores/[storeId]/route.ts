
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Store } from "../../../../entities/store/types";
import { StoreIdInput } from "../../../../entities/store/schemas";
import { validateOrThrowSync } from "../../../../../lib/utils";

function getStoreById(storeId: string) : Store | null {
  const dataPath = path.join(process.cwd(), "data", "store.json");
  const storeData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Store;
  if(storeData.id !== storeId) return null
  return storeData
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const resolvedParams = await params;
    const parsedParams = validateOrThrowSync(resolvedParams, StoreIdInput)
    const store = getStoreById(parsedParams.storeId)
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(store);
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
