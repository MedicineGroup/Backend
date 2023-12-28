// routes/doctor.router.js
import express from "express";
import {
  generateAnalysisPrescription,
  generatePrescription,
  generateRadiologiePrescription,
  getAllDoctorsByServices,
  getPatientsByDoctorEmailService,
} from "./services/doctor.service.js";

const router = express.Router();

router.get("/getAllDoctorsByService", getAllDoctorsByServices);
router.get("/getPatientsByDoctorEmail", getPatientsByDoctorEmailService);
router.post("/generate-prescription", generatePrescription);
router.post("generate-analysis-prescription", generateAnalysisPrescription);
router.post("generate-radiologie-prescription", generateRadiologiePrescription);

export { router };
