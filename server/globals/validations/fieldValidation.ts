import { Request } from "express";
import { ValidationResult } from "@/globals/types/ValidationResult";
import { validationResult } from "express-validator";

export const fieldValidation = (req: Request): ValidationResult | undefined => {
  const res = validationResult(req);
  if (!validationResult(req).isEmpty()) {
    return {
      isValid: false,
      message: res.array()[0].msg,
    };
  }
};