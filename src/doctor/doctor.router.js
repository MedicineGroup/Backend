// routes/doctor.router.js
import express from "express";
import { getAllDoctorsByServices , getPatientsByDoctorEmailService, getDoctorById} from "./services/doctor.service.js";

const router = express.Router();

router.get("/getAllDoctorsByService", getAllDoctorsByServices);
router.get("/getPatientsByDoctorEmail", getPatientsByDoctorEmailService);
router.get("/getDoctorById", getDoctorById);


export { router };