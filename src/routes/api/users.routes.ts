import { Request, Response, Router } from "express";
import { createUser } from "../../controllers/users.controllers";
import { body } from "express-validator";

const usersRoutes = Router();

usersRoutes.post(
  "/",
  body("user_name").isString().isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").exists(),
  createUser
);

export default usersRoutes;
