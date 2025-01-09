import { body, param } from "express-validator";

import { FieldErrors } from "@/globals/errors/fieldErrors";
import { TaskStatus } from "@/globals/constants";

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

export const addTaskValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("mentor_id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("task")
      .isObject()
      .bail(),
    body("task.title")
      .notEmpty()
      .isString()
      .withMessage(FieldErrors.INVALID_TASK_TITLE),
    body("task.description")
      .notEmpty()
      .isString()
      .withMessage(FieldErrors.INVALID_TASK_DESCRIPTION)];
};

export const changeTaskStatusValidator = () => {
  return [param("id").isNumeric().withMessage(FieldErrors.INVALID_ID),
    body("status").isString().custom((value: string) => {
      if (Object.values(TaskStatus).includes(value.toUpperCase())) {
        return true;
      }
      throw new Error(FieldErrors.INVALID_STATUS);
    })];
};