// routes/doctor.router.js
import express from "express";
import {
  generateAnalysisPrescription,
  generatePrescription,
  generateRadiologiePrescription,
 getAllConsultationsDoctor ,getAllDoctorsByServices,
  getPatientsByDoctorEmailService,
, getDoctorById} from "./services/doctor.service.js";

const router = express.Router();

router.get("/getAllDoctorsByService", getAllDoctorsByServices);
router.get("/getPatientsByDoctorEmail", getPatientsByDoctorEmailService);
router.post("/generate-prescription", generatePrescription);
router.post("generate-analysis-prescription", generateAnalysisPrescription);
router.post("generate-radiologie-prescription", generateRadiologiePrescription);
router.get("/getDoctorById", getDoctorById);

router.get("/getConsultations", getAllConsultationsDoctor);


export { router };
