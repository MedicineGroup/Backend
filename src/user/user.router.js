import * as dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import { findAll} from "./services/user.service.js";


const userRouter = Router();
userRouter.get('/consultations', findAll);
export { userRouter };