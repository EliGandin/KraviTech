import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";

import { existingEmailValidation, fieldValidation } from "../../globals/validations";
import { createMentor } from "../../repositories/mentors";

const signupRouter = Router();

signupRouter.post("/signup/mentor",
  [body("name").isString(), body("email").isEmail(), body("password").isLength({ min: 4 }), body("field").isString(), body("experience").isString()],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const fieldValidationResult = fieldValidation(req);
      if (fieldValidationResult) {
        res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
        return;
      }

      const { name, email, phone_number, password, field, company, position, experience } = req.body;

      const dbValidationResult = await existingEmailValidation(req.body.email);
      if (!dbValidationResult.isValid) {
        res.status(StatusCodes.BAD_REQUEST).send(dbValidationResult.message);
        return;
      }

      await createMentor({ name, email, phone_number, password, field, company, position, experience });

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  },
);

export default signupRouter;
