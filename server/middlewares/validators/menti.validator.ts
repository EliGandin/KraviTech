import { param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const deleteMentiValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};