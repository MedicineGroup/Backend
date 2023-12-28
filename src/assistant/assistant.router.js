
import express from "express";
import { getAllConsultationsAssistant, getAssistantByEmail } from "./services/assistant.service.js";

const router = express.Router();

router.get("/getAssistantByEmail", getAssistantByEmail);
router.get("/getConsultations",getAllConsultationsAssistant)


export { router };