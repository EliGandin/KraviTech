import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getAllMentors } from "../../../repositories/mentors";

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
})

export default  mentorRouter