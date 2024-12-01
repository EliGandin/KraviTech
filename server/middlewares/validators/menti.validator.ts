import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { Status } from "@/globals/constants";

export const deleteMentiValidator = () => {
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