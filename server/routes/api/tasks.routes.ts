import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

import { fieldValidation } from "@/globals/validations/fieldValidation";

import {
  addSubtask,
  addTask,
  getTaskDetails,
  getTasksByMenti,
  getTasksByMentor,
} from "@/repositories/tasks.repository";
import {
  addSubtaskValidator, addTaskValidator, changeTaskStatusValidator, taskDetailsByMentorValidator,
  tasksByMentiValidator,
  tasksByMentorValidator,
} from "@/middlewares/validators/tasks.validator";
import { changeSubtaskStatusController, changeTaskStatusController } from "@/controllers/tasks/tasks.controller";

const taskRouter = Router();

taskRouter.get("/mentor/:id", tasksByMentorValidator(), async (req: Request, res: Response) => {
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

taskRouter.get("/TaskDetails/:mentiId/:taskId", taskDetailsByMentorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { mentiId, taskId } = req.params;

    const taskDetails = await getTaskDetails(Number(taskId), Number(mentiId));
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

    const tasks = await getTasksByMenti(Number(id));
    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

taskRouter.post("/SubTask/menti/:id", addSubtaskValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { taskId } = req.body;
    const { subtask } = req.body;

    await addSubtask(Number(id), Number(taskId), subtask);
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

    const { id } = req.params;
    const { mentor_id } = req.body;
    const { task } = req.body;


    await addTask(Number(id), Number(mentor_id), task);
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

    await changeTaskStatusController(Number(id), status);
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

    await changeSubtaskStatusController(Number(id), subtaskId, status);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default taskRouter;