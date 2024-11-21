import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { fieldValidation } from "@/globals/validations/fieldValidation";
import { loginController } from "@/controllers/users/login.controller";
import { loginValidator } from "@/middlewares/validators/login.validator";

const loginRouter = Router();

loginRouter.post("/",
  loginValidator(),
  async (req: Request, res: Response): Promise<void> => {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }
    const { email, password } = req.body;

    try {
      const user = await loginController(email, password);
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).send();
        return;
      }

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      const e = error as Error;
      console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  },
);

export default loginRouter;