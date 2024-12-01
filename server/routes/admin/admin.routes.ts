import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getAllMessages, getAllPendingUsers } from "@/repositories/admin.repository";
import { updateMessageValidator, adminValidator } from "@/middlewares/validators/admin.validator";
import { activationController, updateMessageController } from "@/controllers/admin/admin.controller";
import { fieldValidation } from "@/globals/validations/fieldValidation";

const adminRouter = Router();

adminRouter.get("/PendingUsers", async (req: Request, res: Response) => {
  try {
    const pendingUsers = await getAllPendingUsers();
    res.status(StatusCodes.OK).json({ data: pendingUsers });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

adminRouter.put("/activate", adminValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id, role } = req.body;
    await activationController(id, role);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

adminRouter.get("/messages", async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const messages = await getAllMessages();
    res.status(StatusCodes.OK).json({ data: messages });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

adminRouter.put("/UpdateMessage", updateMessageValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id, operator_id } = req.body;
    await updateMessageController(id, operator_id);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default adminRouter;