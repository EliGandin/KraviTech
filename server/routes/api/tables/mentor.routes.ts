import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import multer from "multer";

import { deleteMentor, getAllMentors, getDashboardData, getMentor } from "@/repositories/mentors.repository";
import {
  changeStatusValidator,
  mentorIdValidator,
  updateProfileValidator,
} from "@/middlewares/validators/mentor.validator";
import { fieldValidation } from "@/globals/validations/fieldValidation";
import {
  changeStatusController,
  profileImageController,
  updateProfileController,
} from "@/controllers/mentors/mentors.controller";

const mentorRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

mentorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const mentors = await getAllMentors();
    res.status(StatusCodes.OK).json({ data: mentors });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mentor = await getMentor(Number(id));
    res.status(StatusCodes.OK).json({ data: mentor });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.delete("/:id", mentorIdValidator(), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteMentor(Number(id));
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.put("/ChangeStatus/:id", changeStatusValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    await changeStatusController(Number(id), status);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.put("/UpdateProfile/:id", updateProfileValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { name, email, phone_number, position, company, field, experience } = req.body;

    await updateProfileController(Number(id), { name, email, phone_number, position, company, field, experience });
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.get("/Dashboard/:id", mentorIdValidator(), async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const data = await getDashboardData(Number(id));
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentorRouter.put("/image/:id", upload.single("image"), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const file = req.file as Express.Multer.File;
    if (!file) {
      res.status(400).json({ error: `Missing file input.` });
      return;
    }

    const fileType = file.originalname.split(".").pop();
    if (!fileType) {
      res.status(400).json({ error: "Invalid file type." });
      return;
    }

    await profileImageController(
      file,
      fileType,
      Number(id),
    );

    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default mentorRouter;