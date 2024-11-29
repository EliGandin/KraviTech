import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllOperators } from "@/repositories/operator.repository";

const operatorRouter = Router();

operatorRouter.get("/", async (req: Request, res: Response) => {
  try {
    const operators = await getAllOperators();
    res.status(StatusCodes.OK).json({ data: operators });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default operatorRouter;