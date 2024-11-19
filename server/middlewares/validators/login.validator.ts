import { body } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const loginValidator = () => {
  return [body("email").isEmail().withMessage(FieldErrors.INVALID_EMAIL),
    body("password").isLength({ min: 4 }).isString().withMessage(FieldErrors.INVALID_PASSWORD),
  ];
};