import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import { fieldValidation } from "@/globals/validations/fieldValidation";

import {
  addSubtaskValidator, addTaskValidator, changeTaskStatusValidator, taskDetailsByMentorValidator,
  tasksByMentiValidator,
  tasksByMentorValidator,
} from "@/middlewares/validators/tasks.validator";
import {
  addTaskController,
  changeSubtaskStatusController,
  changeTaskStatusController,
  addSubtaskController, getTasksByMentorController,
} from "@/controllers/tasks.controller";
import { getTasksByMenti, getTaskDetails } from "@/aws/dynamo/dynamodb";

const taskRouter = Router();

taskRouter.get("/mentor/:id", tasksByMentorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;

    const tasks = await getTasksByMentorController(id);
    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.get("/TaskDetails/:taskId", taskDetailsByMentorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { taskId } = req.params;

    const taskDetails = await getTaskDetails(taskId);
    res.status(StatusCodes.OK).json({ data: taskDetails });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.get("/menti/:id", tasksByMentiValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;

    const tasks = await getTasksByMenti(id);
    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.post("/SubTask/:taskId", addSubtaskValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { taskId } = req.params;
    const { subtask } = req.body;

    await addSubtaskController(taskId, subtask);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.post("/:id", addTaskValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id: menti_id } = req.params;
    const { mentor_id } = req.body;
    const { task } = req.body;

    await addTaskController(task, menti_id, mentor_id);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.put("/ChangeTaskStatus/:id", changeTaskStatusValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    await changeTaskStatusController(id, status);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.put("/ChangeSubtaskStatus/:taskId", async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { taskId: id } = req.params;
    const { subtaskId, status } = req.body;

    await changeSubtaskStatusController(id, subtaskId, status);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default taskRouter;