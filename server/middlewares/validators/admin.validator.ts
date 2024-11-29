import { body } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const adminValidator = () => {
  return [
    body("id").isNumeric().withMessage(FieldErrors.INVALID_NAME),
    body("role").isEmail().withMessage(FieldErrors.INVALID_ROLE),
  ];
};

export const updateMessageValidator = () => {
  return [
    body("id").isNumeric().withMessage(FieldErrors.INVALID_NAME),
    body("operator_id")
      .optional({ nullable: true })
      .isNumeric()
      .withMessage(FieldErrors.INVALID_OPERATOR_ID),
  ];
};