// services/doctor.service.js
import DoctorDAO from "../dao/doctor.dao.js";
import Doctor from "../models/doctor.model.js";


export const addDoctor = async (req, res) => {
  try {
    const { nom, detail ,service} = req.body;

    const newDoctor = new Doctor ({
      nom,
      detail,
      service
    });

    const savedDoctor = await DoctorDAO.addDoctor(newDoctor);
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllDoctorsByService = async (req, res) => {
  try {
    const { service } = req.query; // Assurez-vous que serviceId est passé en tant que paramètre dans votre route

    const doctors = await DoctorDAO.getAllDoctorsByService(service);
    res.status(200).json({doctors});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};