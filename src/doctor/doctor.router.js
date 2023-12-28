// routes/doctor.router.js
import express from "express";
import {getAllConsultationsDoctor ,getAllDoctorsByServices , getPatientsByDoctorEmailService, getDoctorById} from "./services/doctor.service.js";

const router = express.Router();

router.get("/getAllDoctorsByService", getAllDoctorsByServices);
router.get("/getPatientsByDoctorEmail", getPatientsByDoctorEmailService);
router.get("/getDoctorById", getDoctorById);

router.get("/getConsultations", getAllConsultationsDoctor);


export { router };