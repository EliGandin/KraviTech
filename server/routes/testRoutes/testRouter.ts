import { Router } from "express";
// import { StatusCodes } from "http-status-codes";

// import { mongo } from "@/db/mongo";
// import db from "@/db/db";

const testRouter = Router();

// testRouter.get("/healthcheck", async (req, res) => {
//   try {
//     const sqlDB = db;
//     const mongoDB = await mongo();
//     if (!sqlDB || mongoDB.connection.readyState !== 1) {
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("SQL DB is not connected");
//       return;
//     }
//
//     res.status(StatusCodes.OK).send("DBs are connected !!");
//   } catch (err) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
//   }
// });

export default testRouter;