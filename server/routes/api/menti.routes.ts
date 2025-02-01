import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import multer from "multer";

import {
  changeMentorValidator,
  changeOperatorValidator,
  changeStatusValidator,
  mentiIdValidator,
  updateProfileValidator,
} from "@/middlewares/validators/menti.validator";
import {
  changeStatusController,
  getImagesController,
  putProfileImageController,
  updateProfileController,
} from "@/controllers/mentis/mentis.controller";
import {
  changeMentor,
  changeOperator,
  deleteMenti,
  getAllMentis,
  getMenti,
} from "@/repositories/mentis.repository";
import { fieldValidation } from "@/globals/validations/fieldValidation";

const mentiRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

mentiRouter.get("/", async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const mentis = await getAllMentis();
    res.status(StatusCodes.OK).json(mentis);
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menti = await getMenti(Number(id));
    res.status(StatusCodes.OK).json(menti);
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.delete("/:id", mentiIdValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    await deleteMenti(Number(id));

    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.put("/ChangeStatus/:id", changeStatusValidator(), async (req: Request, res: Response) => {
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

mentiRouter.put("/ChangeOperator/:id", changeOperatorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { operator_id } = req.body;

    console.log(`id: ${id}, operatorId: ${operator_id}`);

    await changeOperator(Number(id), operator_id);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.put("/ChangeMentor/:id", changeMentorValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { mentor_id } = req.body;

    await changeMentor(Number(id), mentor_id);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.put("/UpdateProfile/:id", updateProfileValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;
    const { name, email, phone_number, education, experience, goals, comments } = req.body;

    const result = await updateProfileController(Number(id), {
      name,
      email,
      phone_number,
      education,
      experience,
      goals,
      comments,
    });
    if (!result.isValid) {
      res.status(StatusCodes.BAD_REQUEST).send(result.message);
      return;
    }

    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.get("/image/:id", mentiIdValidator(), async (req: Request, res: Response) => {
  try {
    const fieldValidationResult = fieldValidation(req);
    if (fieldValidationResult) {
      res.status(StatusCodes.BAD_REQUEST).send(fieldValidationResult.message);
      return;
    }

    const { id } = req.params;

    const image = await getImagesController(Number(id));
    if (!image) {
      res.status(StatusCodes.NO_CONTENT).send();
      return;
    }

    res.status(StatusCodes.OK).send(image);
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

mentiRouter.put("/image/:id", upload.single("image"), async (req: Request, res: Response) => {
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

    await putProfileImageController(
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

export default mentiRouter;