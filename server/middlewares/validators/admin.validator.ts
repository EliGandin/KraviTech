import { body } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { Roles } from "@/globals/constants";

export const adminActivationValidator = () => {
  return [
    body("id").isNumeric().withMessage(FieldErrors.INVALID_NAME),
    body("role").custom((value: string) => {
      if (Object.values(Roles).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_ROLE);
    }),
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

export const newMessageValidator = () => {
  return [
    body("name").isString().withMessage(FieldErrors.INVALID_NAME),
    body("email").isEmail().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").isString().withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("title").isString(),
    body("message").isString(),
  ];
};