import { Request, Response, Router } from "express";
import { fieldValidation } from "@/globals/validations/fieldValidation";
import { StatusCodes } from "http-status-codes";

import { getTasksByMenti, getTasksByMentor } from "@/repositories/tasks.repository";
import { TasksByMentiValidator, TasksByMentorValidator } from "@/middlewares/validators/tasks.validator";

const taskRouter = Router();

taskRouter.get("/mentor/:id", TasksByMentorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;

    const tasks = await getTasksByMentor(Number(id));
    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.get("/menti/:id", TasksByMentiValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;

    const tasks = await getTasksByMenti(Number(id));
    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default taskRouter;