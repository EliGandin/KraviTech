import express from "express";
import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import signupRouter from "./routes/signup/signup.routes";
import loginRouter from "./routes/login/login.routes";

const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

app.use("/signup", signupRouter);
app.use("/login", loginRouter)

app.use("/", () => {
  console.log("Hello, world!");
});

app.listen(process.env.BACKEND_PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT || 8000}`);
});
