import { ValidationResult } from "@/globals/types/ValidationResult";
import db from "@/db/db";

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