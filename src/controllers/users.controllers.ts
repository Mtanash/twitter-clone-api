import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";
import { Error } from "../types/Error.type";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(
      (password as string) + process.env.BCRYPT_SECRET,
      parseInt(process.env.BCRYPT_SALT as string)
    );

    const user = new UserModel({
      user_name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "success", data: user });
  } catch (error) {
    const err: Error = { status: 500, message: (error as Error).message };
    next(err);
  }
};
