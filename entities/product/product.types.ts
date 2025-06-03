export type Product = {
  id: string; // MongoDB ObjectId
  storeData: {
    id: string;
    name: string;
  };
  categories: {
    mainId: string; 
    mainName: string;
    mainPosition?: number;
    secondaryId?: string;
    secondaryName?: string;
    secondaryPosition?: number;
    tertiaryId?: string;
    tertiaryName?: string;
    tertiaryPosition?: number;
  };
  title: string;
  soldAmount: number; // default: 0
  isNew: boolean;
  isBestSelling: boolean;
  rating: number; // 0 to 5
  ratingVotes: number; // default: 0
  priceConfig: {
    currency: "USD" | "ARS";
    originalPrice: number; 
    price: number;        
    discount: number; // default: 0
    acceptInstallments: boolean;
    installmentsAmount?: number;
    installmentsPrice?: number;
    installmentsInterest?: boolean;
  };
  colors?: {
    colorName: string;
    productImage: string; //base64
  }[];
  mainImage: string; //base64
  stock: {
    original: number;
    available: number;
  };
  mainDescription: string[];
  description: string;
  technicalDescription: {
    screenSize?: string;
    internalMemory?: string;
    backCamera?: string;
    frontCamera?: string;
    hasNfc?: boolean;
    unlockingMethod?: string;
  };
  freeShipment: boolean,
  createdAt: Date;
  updatedAt: Date;
};

export type PaginatedProducts = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  results: Product[];
};

export type PaginationInput = {
  page: number,
  limit: number,
  storeId?: string,
  excludedId?: string,
  tertiaryCategoryId?: string
}

export type ProductImages = {
  productId: string,
  images: string[]
}

