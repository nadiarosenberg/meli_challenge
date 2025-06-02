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
  rating: number; // 0 to 5, accepts 1 decimal
  ratingVotes: number; // default: 0
  priceConfig: {
    currency: "USD" | "ARS";
    originalPrice: number; // accepts 2 decimals
    price: number;         // accepts 2 decimals
    discount: number;      // default: 0, accepts 2 decimals
    acceptInstallments: boolean;
    installmentsAmount?: number;
    installmentsPrice?: number;
    installmentsInterest?: boolean;
  };
  colors?: {
    colorName: string;
    productImage: string; // base64
  }[];
  mainImage: string; // base64
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
  createdAt: Date;
  updatedAt: Date;
};

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

export type PaymentMethodType = 'creditCard' | 'debitCard' | 'cash' | 'wallet' | 'bankTransfer';

export type PaymentMethodName =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'oca'
  | 'rapipago'
  | 'pagofacil'
  | 'mercadopago'
  | 'uala';

export type PaymentMethod = {
  type: PaymentMethodType;
  method: PaymentMethodName;
  installments?: number; 
  installmentsInterest?: boolean;
};

export type ProductPaymentMethods = {
  productId: string;
  methods: PaymentMethod[];
};

export type ProductsResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  products: ProductPreview[];
};

export type ProductPreview = {
  id: string;
  title: string;
  storeData: {
    id: string;
    name: string;
  };
  mainImage: string;
  priceConfig: {
    price: number;
    currency: "USD" | "ARS";
  };
  isBestSelling: boolean;
  isNew: boolean;
};