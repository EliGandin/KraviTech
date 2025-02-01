import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { Experience, Status } from "@/globals/constants";
import { Field } from "@/globals/constants";

export const mentorIdValidator = () => {
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

export const updateProfileValidator = () => {
  return [param("id").optional().isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("name").optional().isString().notEmpty().withMessage(FieldErrors.INVALID_NAME),
    body("email").optional().isEmail().notEmpty().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").optional().isString().notEmpty().withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("field").optional().notEmpty().custom((value: string) => {
      if (Object.values(Field).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_FIELD);
    }),
    body("company").optional().notEmpty().isString(),
    body("position").optional().notEmpty().isString(),
    body("experience").optional().notEmpty().custom((value: string) => {
      if (Object.values(Experience).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_EXPERIENCE);
    }),
  ];
};