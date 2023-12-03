import { Router } from "express";
import {
  loginAction,
  logoutAction,
  signupAction,
} from "./services/auth.service.js";
import { checkSchema } from "express-validator";
import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";

const router = Router();
dotenv.config();

const signupValidationSchema = {
  firstname: {
    isAlphanumeric: true,
    errorMessage: "firstname format is invalid",
  },
  lastname: {
    isAlphanumeric: true,
    errorMessage: "lastname format is invalid",
  },
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isAlphanumeric: true,
    errorMessage: "Password format is invalid",
  },
};

const loginValidationSchema = {
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isAlphanumeric: true,
    errorMessage: "Password format is invalid",
  },
};

router.post("/signup", checkSchema(signupValidationSchema), signupAction);
router.post("/login", checkSchema(loginValidationSchema), loginAction);
router.get(
  "/logout",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }),
  logoutAction
);

export { router };
