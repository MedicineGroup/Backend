// services/doctor.service.js
import { getAllDoctorsByService } from "../dao/doctor.dao.js";

export const getAllDoctorsByServices = async (req, res) => {
  try {
    const { service } = req.query;
    const doctors = await getAllDoctorsByService(service);
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
