// services/doctor.service.js
import DoctorDAO from "../dao/doctor.dao.js";
import Doctor from "../models/doctor.model.js";


export const addDoctor = async (req, res) => {
  try {
    const { nom, detail ,serviceId} = req.body;

    const newDoctor = new Doctor ({
      nom,
      detail,
      serviceId
    });

    const savedDoctor = await DoctorDAO.addDoctor(newDoctor);
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllDoctorsByServiceId = async (req, res) => {
  try {
    const { serviceId } = req.query; // Assurez-vous que serviceId est passé en tant que paramètre dans votre route

    const doctors = await DoctorDAO.getAllDoctorsByServiceId(serviceId);
    res.status(200).json({doctors});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};