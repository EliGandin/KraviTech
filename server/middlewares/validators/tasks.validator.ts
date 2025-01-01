import { param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const TasksByMentorValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};

export const TasksByMentiValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};