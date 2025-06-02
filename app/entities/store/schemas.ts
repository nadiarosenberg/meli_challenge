import Joi from "joi";

export const StoreIdInput = Joi.object({
  storeId: Joi.string()
});