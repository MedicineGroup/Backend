import Express from "express";
import { router as authRouter } from "./auth/auth.router.js";
import { router as userRouter } from "./user/user.router.js";
import { router as serviceRouter } from "./service/service.router.js";
import { router as doctorRouter } from "./doctor/doctor.router.js";
import cors from "cors";
import connectToDB from "./config/db.config.js";
import * as dotenv from "dotenv";
import { expressjwt } from "express-jwt";
import { v2 } from "cloudinary";


const app = Express();
dotenv.config();

app.use(cors());

app.use(Express.json());

app.use("/auth", authRouter);
// Apply authentication middleware to all routes under "/user"
app.use(
  "/user",
  expressjwt({ secret: process.env.SECRET || "Bearer", algorithms: ["HS256"] }),
  userRouter
);
app.use("/service",
 expressjwt({ secret: process.env.SECRET || "Bearer", algorithms: ["HS256"] }),
serviceRouter);

app.use("/doctor",
 expressjwt({ secret: process.env.SECRET || "Bearer", algorithms: ["HS256"] }),
doctorRouter);
app.listen(8888, async () => {
  await connectToDB();
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
  });
  console.log("server is running on: http://localhost:8888");
});
