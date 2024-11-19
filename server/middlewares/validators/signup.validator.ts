import { body } from "express-validator";

import { FieldErrors } from "../../globals/errors/fieldErrors";

export const mentorSignupValidator = () => {
  return [
    body("name").isString().withMessage(FieldErrors.INVALID_NAME),
    body("email").isEmail().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").isString().isLength({ min: 10, max: 10 }).withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("password").isLength({ min: 4 }).isString().withMessage(FieldErrors.INVALID_PASSWORD),
    body("field").isString().withMessage(FieldErrors.INVALID_FIELD),
    body("experience").isString().withMessage(FieldErrors.INVALID_EXPERIENCE),
  ];
};

export const mentiSignupValidator = () => {
  return [
    body("name").isString().withMessage(FieldErrors.INVALID_NAME),
    body("email").isEmail().withMessage(FieldErrors.INVALID_EMAIL),
    body("phone_number").isString().isLength({ min: 10, max: 10 }).withMessage(FieldErrors.INVALID_PHONE_NUMBER),
    body("password").isLength({ min: 4 }).isString().withMessage(FieldErrors.INVALID_PASSWORD),
    body("education").isString().optional(),
    body("experience").isString().optional(),
    body("goals").isString().optional(),
    body("comments").isString().optional(),
  ];
};