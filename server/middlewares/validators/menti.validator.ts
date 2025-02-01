import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { Status } from "@/globals/constants";

export const mentiIdValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};

export const changeStatusValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("status").custom((value: string) => {
      if (Object.values(Status).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_STATUS);
    })];
};

export const changeOperatorValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID), body("operator_id").isNumeric().withMessage(FieldErrors.INVALID_OPERATOR_ID)];
};

export const changeMentorValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID), body("mentor_id").isNumeric().withMessage(FieldErrors.INVALID_OPERATOR_ID)];
};

export const updateProfileValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("name").optional().isString().notEmpty().withMessage(FieldErrors.INVALID_NAME),
    body("email").optional().isEmail().notEmpty().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").optional().isString().notEmpty().withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("education").optional().isString().notEmpty(),
    body("experience").optional().isString().notEmpty(),
    body("goals").optional().isString().notEmpty(),
    body("comments").optional().isString().notEmpty(),
  ];
};