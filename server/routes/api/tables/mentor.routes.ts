import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { deleteMentor, getAllMentors } from "@/repositories/mentors.repository";
import { deleteMentorValidator } from "@/middlewares/validators/mentor.validator";

const mentorRouter = Router();

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

mentorRouter.delete("/:id", deleteMentorValidator(), async (req: Request, res: Response) => {
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

export default mentorRouter;