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
import adminRouter from "@/routes/admin/admin.routes";
import operatorRouter from "@/routes/operators/operator.routes";
import testRouter from "@/routes/testRoutes/testRouter";

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
app.use("/admin", adminRouter);
app.use("/operator", operatorRouter);

app.use("/test", testRouter);

export default app;