import "tsconfig-paths/register";
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import signupRouter from "./routes/signup/signup.routes";
import loginRouter from "./routes/login/login.routes";
import mentorRouter from "./routes/api/tables/mentor.routes";
import mentiRouter from "./routes/api/tables/menti.routes";


const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/mentors", mentorRouter);
app.use("/mentis", mentiRouter);

app.use("/health", (req, res) => {
  console.log("Hello, world!");
  res.status(200).send("Hello, world!");
});

app.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT || 8000}`);
});

export default app;