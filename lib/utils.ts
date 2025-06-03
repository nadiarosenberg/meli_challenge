import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Joi from "joi";
import { NextResponse } from 'next/server';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapCurrency(currency: string) { return  currency === "USD" ? "US$" : "$" }

export const validateOrThrowSync = <T>(params: object, schema: Joi.Schema<T>): T => {
  const { error, value } = schema.validate(params, { abortEarly: false });
  if (error) {
    throw new Error('invalid input');
  }
  return value;
};

export const nullToUndefined = (value) => value === null? undefined : value //for next.js query string parsing

export const parseError = (error: any) : NextResponse => {
  if(error.message === 'invalid input'){
    return NextResponse.json(
      { error: "invalid input" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}