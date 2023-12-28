// services/doctor.service.js
import {
  getAllDoctorsByService,
  getPatientsByDoctorEmail,
} from "../dao/doctor.dao.js";

export const getAllDoctorsByServices = async (req, res) => {
  try {
    const { service } = req.query;
    const doctors = await getAllDoctorsByService(service);
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientsByDoctorEmailService = async (req, res) => {
  try {
    const { email } = req.query; // Assurez-vous que doctorEmail est passé en tant que paramètre dans votre route

    const doctor = await getPatientsByDoctorEmail(email);
    const patients = doctor.patients;

    res.status(200).json({ patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
