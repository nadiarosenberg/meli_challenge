import fs from "fs";
import path from "path";
import { Store } from "../../entities/store/store.types";

export function getStoreById(storeId: string) : Store | null {
  const dataPath = path.join(process.cwd(), "data", "store.json");
  const storeData = JSON.parse(fs.readFileSync(dataPath, "utf8")) as Store;
  if(storeData.id !== storeId) return null
  return storeData
}