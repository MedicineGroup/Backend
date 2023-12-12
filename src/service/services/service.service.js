import ServiceDAO from "../dao/service.dao.js";
import Service from "../models/service.model.js";

export const addService = async (req, res) => {
    try {
        const { nom, detail } = req.body;

    const newService = new Service({
        nom,
        detail,
    });
        const savedService = await ServiceDAO.addService(newService);
        res.status(201).json(savedService);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};


export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceDAO.getAllServices();
    res.status(200).json({services});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

