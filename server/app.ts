import "tsconfig-paths/register";
import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import signupRouter from "./routes/signup/signup.routes";
import loginRouter from "./routes/login/login.routes";
import mentorRouter from "./routes/api/mentor.routes";
import mentiRouter from "./routes/api/menti.routes";
import adminRouter from "@/routes/admin/admin.routes";
import operatorRouter from "@/routes/operators/operator.routes";
import testsRoutes from "@/routes/testRoutes/tests.routes";
import taskRouter from "@/routes/api/tasks.routes";

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
app.use("/tasks", taskRouter);

app.use("/test", testsRoutes);

export default app;