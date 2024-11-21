import db from "@/db/db";
import { ValidationResult } from "@/globals/types/ValidationResult";
import { dbTables } from "@/globals/constants";

export const existingEmailValidation = async (email: string): Promise<ValidationResult> => {
  for (const table of dbTables) {
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