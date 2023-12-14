// routes/doctor.router.js
import express from "express";
import { addDoctor, getAllDoctorsByService } from "./services/doctor.service.js";

const router = express.Router();

router.post("/addDoctor", addDoctor);
router.get("/getAllDoctorsByService", getAllDoctorsByService);


export { router };