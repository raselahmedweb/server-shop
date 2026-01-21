import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
const app = express();

app.use(cookieParser());
app.use(express.json());
const allowedOrigins = envVars.FRONTEND_URL
  ? envVars.FRONTEND_URL.split(",")
  : [];
const corsOption = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, PATCH",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the System Server",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
