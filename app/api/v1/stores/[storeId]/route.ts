import { Store } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    const storeDataPath = path.join(process.cwd(), "data", "store.json");
    const storeData = JSON.parse(fs.readFileSync(storeDataPath, "utf8")) as Store;
    if (storeData.id !== storeId) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(storeData);
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
