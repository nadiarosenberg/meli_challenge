import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Joi from "joi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapCurrency(currency: string) { return  currency === "USD" ? "US$" : "$" }

export const validateOrThrowSync = (params: object, schema: Joi.Schema) => {
  const { error, value } = schema.validate(params, { abortEarly: false });
  if (error) {
    throw new Error('invalid input');
  }
  return value
};

export const nullToUndefined = (value) => value === null? undefined : value 