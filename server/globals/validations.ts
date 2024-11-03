import { Request } from "express";
import { validationResult } from "express-validator";

import { ValidationResult } from "./types/validationResult";
import db from "../db/db";

export const fieldValidation = (req: Request): ValidationResult | undefined => {
  const res = validationResult(req);
  if (!validationResult(req).isEmpty()) {
    return {
      isValid: false,
      message: res.array()[0].msg,
    };
  }
};

export const existingEmailValidation = async (email: string): Promise<ValidationResult> => {
  const tables = ["mentors", "mentis", "admins"];
  for (const table of tables) {
    const query = `SELECT id
                   FROM ${table}
                   WHERE email = $1`;

    const { rows } = await db.query(query, [email]);
    if (rows.length > 0) {
      return {
        isValid: false,
        message: "Email is being used",
      };
    }
  }

  return { isValid: true };
};
