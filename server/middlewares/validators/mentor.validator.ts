import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { Experience, Status } from "@/globals/constants";
import { Field } from "@/globals/constants";

export const deleteMentorValidator = () => {
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
    body("name").optional().isString().withMessage(FieldErrors.INVALID_NAME),
    body("email").optional().isEmail().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").optional().isString().withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("field").optional().custom((value: string) => {
      if (Object.values(Field).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_FIELD);
    }),
    body("company").optional().isString(),
    body("position").optional().isString(),
    body("experience").optional().custom((value: string) => {
      if (Object.values(Experience).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_EXPERIENCE);
    }),
  ];
};