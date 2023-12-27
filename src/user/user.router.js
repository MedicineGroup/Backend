import * as dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  updateUserInfos,
  updateUserProfileImage,
  getAllConsultations,
  getFullBookedDatesByDoctorId,
  bookedTimesByDoctorAndDate,
  bookConsultation,
} from "./services/user.service.js";
import multer from "multer";
import { checkSchemaValidityMiddleware } from "../middlewares/common.middleware.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const userInfosValidationSchema = {
  dateOfBirth: {
    custom: {
      options: (value) => {
        // Check if the value is a valid date
        if (!Date.parse(value)) {
          throw new Error("Invalid date Of Birth format");
        }
        return true;
      },
    },
    errorMessage: "dateOfBirth is required",
  },
  address: {
    isString: true,
    errorMessage: "address is required",
  },
  gender: {
    isAlphanumeric: true,
    errorMessage: "Gender is required",
  },
};

router.post(
  "/update-infos",
  checkSchema(userInfosValidationSchema),
  checkSchemaValidityMiddleware,
  updateUserInfos
);

router.post(
  "/update-profile-image",
  upload.single("profileImage"),
  updateUserProfileImage
);

router.get("/consultations", getAllConsultations);

router.get("/fully-booked-dates", getFullBookedDatesByDoctorId);

router.get("/booked-times", bookedTimesByDoctorAndDate);

router.post("/save-appointment", bookConsultation);

export { router };
