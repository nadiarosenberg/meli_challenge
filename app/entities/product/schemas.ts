import Joi from "joi";
import { nullToUndefined } from "../../../lib/utils";

export const GetProductsInput = Joi.object({
  page: Joi.number().integer().min(1).allow(null).custom(nullToUndefined).default(1),
  limit: Joi.number().integer().min(1).allow(null).custom(nullToUndefined).default(10),
  storeId: Joi.string().optional().allow(null).custom(nullToUndefined),
  tertiaryId: Joi.string().optional().allow(null).custom(nullToUndefined),
  excludedId: Joi.string().optional().allow(null).custom(nullToUndefined)
});

export const ProductIdInput = Joi.object({
  productId: Joi.string()
});