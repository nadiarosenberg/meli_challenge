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