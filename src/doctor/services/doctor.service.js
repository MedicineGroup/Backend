// services/doctor.service.js
import { getAllConstDoct } from "../../consultation/dao/consultation.dao.js";
import {
  getAllDoctorsByService,
  getPatientsByDoctorEmail,
  findDoctorByEmail,
  findDoctorById,
} from "../dao/doctor.dao.js";
import { Types } from "mongoose";


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

export const getDoctorById = async (req, res) => {
  try {
    console.log("***********",req.query.id)
    const doctor = await findDoctorById(new Types.ObjectId(req.query.id));
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getAllConsultationsDoctor(request, response) {
  try {
    const userEmail = request.auth.email;
    const doctor = await findDoctorByEmail(userEmail);
    const consultations = await getAllConstDoct(new Types.ObjectId(doctor._id));
    return response.status(200).json({ consultations });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: "An internal Server error has occured",
    });
  }
}