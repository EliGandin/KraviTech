import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import db from "@/db/db";

const testsRoutes = Router();

testsRoutes.get("/healthcheck", async (req, res) => {
  try {
    const sqlDB = db;
    console.log(db);
    if (!sqlDB) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("SQL DB is not connected");
      return;
    }

    res.status(StatusCodes.OK).send("DB is connected !!");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
});

export default testsRoutes;