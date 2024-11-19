import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { fieldValidation } from "../../globals/validations/fieldValidation";
import { existingEmailValidation } from "../../globals/validations/existingEmailValidation";
import { mentiSignupController, mentorSignupController } from "../../controllers/signupController";
import { mentiSignupValidator, mentorSignupValidator } from "../../middlewares/validators/signup.validator";

const signupRouter = Router();

signupRouter.post("/mentor",
  mentorSignupValidator(),
  async (req: Request, res: Response): Promise<void> => {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { name, email, phone_number, password, field, company, position, experience } = req.body;

    try {
      const dbValidationResult = await existingEmailValidation(req.body.email);
      if (!dbValidationResult.isValid) {
        res.status(StatusCodes.BAD_REQUEST).send(dbValidationResult.message);
        return;
      }

      await mentorSignupController({ name, email, phone_number, password, field, company, position, experience });

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  },
);

signupRouter.post("/menti",
  mentiSignupValidator(),
  async (req: Request, res: Response): Promise<void> => {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { name, email, phone_number, password, education, experience, goals, comments } = req.body;

    try {
      const dbValidationResult = await existingEmailValidation(req.body.email);
      if (!dbValidationResult.isValid) {
        res.status(StatusCodes.BAD_REQUEST).send(dbValidationResult.message);
        return;
      }

      await mentiSignupController({ name, email, phone_number, password, education, experience, goals, comments });

      res.status(StatusCodes.CREATED).send();
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  },
);

export default signupRouter;
