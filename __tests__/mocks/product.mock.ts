import { ProductPaymentMethods } from "../../entities/paymentMethods/paymentMethods.types";
import { Product, ProductImages } from "../../entities/product/product.types";

export const mockedImages: ProductImages = {productId: "123", images: ["imageMock"]}

export const mockedPaymentMethods: ProductPaymentMethods = {
  productId: "123",
  methods: [{type: "creditCard", method: "visa" }]
}

export const mockedProducts = [
  { id: "123", storeData: { id: "store1" }, categories: { tertiaryId: "cat1" } } as Product,
  { id: "456", storeData: { id: "store2" }, categories: { tertiaryId: "cat2" } } as Product,
  { id: "789", storeData: { id: "store1" }, categories: { tertiaryId: "cat1" } } as Product,
];