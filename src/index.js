import Express from "express";
import { router as authRouter } from "./auth/auth.router.js";
import cors from "cors";
import connectToDB from "./config/db.config.js";
import * as dotenv from "dotenv";
import { expressjwt } from "express-jwt";

const app = Express();

dotenv.config();

app.use(cors());

app.use(Express.json());

app.use("/auth", authRouter);

app.listen(8888, async () => {
  await connectToDB();
  console.log("server is running on: http://localhost:8888");
});
