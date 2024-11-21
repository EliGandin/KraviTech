import { body } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const userActivationValidator = () => {
  return [
    body("id").isNumeric().withMessage(FieldErrors.INVALID_NAME),
    body("role").isEmail().withMessage(FieldErrors.INVALID_ROLE),
  ];
};