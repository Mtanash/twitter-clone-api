import { NextFunction, Request, Response } from "express";
import { Error } from "../types/Error.type";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
};

export default errorMiddleware;
