import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { getAllMentis } from "../../../repositories/mentis.repository";

const mentiRouter = Router();

mentiRouter.get("/", async (req: Request, res: Response) => {
  try {
    const mentis = await getAllMentis();
    res.status(StatusCodes.OK).json({ data: mentis });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default mentiRouter;