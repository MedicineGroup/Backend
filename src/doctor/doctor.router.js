// routes/doctor.router.js
import express from "express";
import { getAllDoctorsByServices } from "./services/doctor.service.js";

const router = express.Router();

router.get("/getAllDoctorsByService", getAllDoctorsByServices);


export { router };