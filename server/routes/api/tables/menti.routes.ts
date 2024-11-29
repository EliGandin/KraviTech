import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { deleteMenti, getAllMentis } from "@/repositories/mentis.repository";
import { deleteMentiValidator } from "@/middlewares/validators/menti.validator";

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

mentiRouter.delete("/:id", deleteMentiValidator(), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteMenti(Number(id));

    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default mentiRouter;