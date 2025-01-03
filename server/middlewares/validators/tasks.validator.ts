import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";

export const tasksByMentorValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};

export const taskDetailsByMentorValidator = () => {
  return [param("taskId").isNumeric().withMessage(FieldErrors.INVALID_ID), param("mentiId").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};

export const tasksByMentiValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID)];
};

export const addSubtaskValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("taskId").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("subtask")
      .isObject()
      .bail(),
    body("subtask.title")
      .notEmpty()
      .isString()
      .withMessage(FieldErrors.INVALID_TASK_TITLE),
    body("subtask.description")
      .notEmpty()
      .isString()
      .withMessage(FieldErrors.INVALID_TASK_DESCRIPTION)];
};