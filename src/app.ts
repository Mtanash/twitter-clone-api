import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { corsOptions } from "./config/corsOption";
import { limiter } from "./config/rateLimiter";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import errorMiddleware from "./middleware/error.middleware";

type Error = {
  status?: number;
  message?: string;
  stack?: string;
};

const app = express();

// middleware

// parse body to json
app.use(express.json());

// add helmet security headers
app.use(helmet());

// add rate limit
app.use(limiter);

// add cors
app.use(cors(corsOptions));

// add morgan logger
app.use(morgan("common"));

// routes
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to Twitter clone api 🔥🔥🚀</h1>");
});

app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
  res.send("<h1>Are you lost? 😂 <a href='.'>Go to Home page</a> </h1> ");
});
export default app;
