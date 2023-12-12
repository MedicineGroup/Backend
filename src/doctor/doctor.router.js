// routes/doctor.router.js
import express from "express";
import { addDoctor, getAllDoctorsByServiceId } from "./services/doctor.service.js";

const router = express.Router();

router.post("/addDoctor", addDoctor);
router.get("/getAllDoctorsByServiceId", getAllDoctorsByServiceId);


export { router };