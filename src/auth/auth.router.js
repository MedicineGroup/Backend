import { Router } from "express";
import {
  loginAction,
  loginDoctor,
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
    isString: true,
    errorMessage: "firstname format is invalid",
  },
  lastname: {
    isString: true,
    errorMessage: "lastname format is invalid",
  },
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isString: true,
    errorMessage: "Password format is invalid",
  },
};

const loginValidationSchema = {
  email: {
    isEmail: true,
    errorMessage: "Email Format is invalid",
  },
  password: {
    isString: true,
    errorMessage: "Password format is invalid",
  },
};

router.post("/signup", checkSchema(signupValidationSchema), signupAction);
router.post("/login", checkSchema(loginValidationSchema), loginAction);
router.post("/login-doctor",checkSchema(loginValidationSchema),loginDoctor)
router.get(
  "/logout",
  expressjwt({ secret: process.env.SECRET || 'Bearer', algorithms: ["HS256"] }),
  logoutAction
);

export { router };
