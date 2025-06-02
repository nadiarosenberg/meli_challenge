export type Store = {
  id: string; // MongoDB ObjectId
  name: string;
  profileImage: string; // base64
  bannerImage: string;  // base64
  isOfficialStore: boolean;
  productAmount: number;
  sellsAmount: number; // default 0
  storeUrl: string;
};