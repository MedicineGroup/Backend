import express from "express";
import { addService, getAllServices } from "./services/service.service.js";

const router = express.Router();

router.post("/addService", addService);

router.get("/getAllServices", getAllServices);

export { router };
