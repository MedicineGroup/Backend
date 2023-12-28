
import express from "express";
import { getAssistantByEmail } from "./services/assistant.service.js";

const router = express.Router();

router.get("/getAssistantByEmail", getAssistantByEmail);


export { router };