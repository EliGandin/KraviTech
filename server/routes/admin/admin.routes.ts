import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllPendingUsers } from "@/repositories/admin.repository";
import { userActivationValidator } from "@/middlewares/validators/userActivationValidator";
import { activationController } from "@/controllers/admin/admin.controller";

const adminRouter = Router();

adminRouter.get("/pendingusers", async (req: Request, res: Response) => {
  try {
    const pendingUsers = await getAllPendingUsers();
    res.status(StatusCodes.OK).json({ data: pendingUsers });
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

adminRouter.put("/activate", userActivationValidator(), async (req: Request, res: Response) => {
  try {
    const { id, role } = req.body;
    await activationController(id, role);
    res.status(StatusCodes.OK).send();
  } catch (error) {
    const e = error as Error;
    console.log(`Error message: ${req.body}: ${e.message}\n${e.stack}`);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

export default adminRouter;