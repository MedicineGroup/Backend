// services/doctor.service.js
import { getAllConstDoct } from "../../consultation/dao/consultation.dao.js";
import {
  getAllDoctorsByService,
  getPatientsByDoctorEmail,
  findDoctorByEmail,
  findDoctorById,
} from "../dao/doctor.dao.js";
import { v2 } from "cloudinary";
import {
  generateAnalysisAndRadiologiePrescription,
  generateTreatmentPrescriptionPDF,
} from "../pdf-generation/generate-pdf.js";
import {
  getConsultationById,
  updateConsultation,
} from "../../consultation/dao/consultation.dao.js";
import { Types } from "mongoose";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import fs from "fs";
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

export const generatePrescription = async (request, response) => {
  try {
    const { consultationId } = request.body;
    const { medicines } = request.body;
    const consultation = await getConsultationById(
      new Types.ObjectId(consultationId)
    );
    const name = `${consultation.patient.lastname} ${consultation.patient.firstname}`;
    const filename = await generateTreatmentPrescriptionPDF(medicines, name);
    const storage = getStorage();
    const storageRef = ref(storage, `files/${filename}`);

    const fileBlob = fs.readFileSync(
      `D:/Learning/Semestre 5/Bases de Données Objet Relationnelles/Projects/hospital-project/Backend/src/doctor/generated-pdfs/${filename}`
    );
    const snapshot = await uploadBytesResumable(storageRef, fileBlob, {
      contentType: "application/pdf",
    });

    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateConsultation(consultationId, {
      prescription: downloadURL,
    });
    return response.status(200).json({ prescription: downloadURL });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const generateAnalysisPrescription = async (request, response) => {
  try {
    const { consultationId } = request.body;
    const { analysis } = request.body;
    const consultation = await getConsultationById(
      new Types.ObjectId(consultationId)
    );
    const name = `${consultation.patient.lastname} ${consultation.patient.firstname}`;
    const filename = await generateAnalysisAndRadiologiePrescription(
      name,
      analysis
    );
    const storage = getStorage();
    const storageRef = ref(storage, `files/${filename}`);

    const fileBlob = fs.readFileSync(
      `D:/Learning/Semestre 5/Bases de Données Objet Relationnelles/Projects/hospital-project/Backend/src/doctor/generated-pdfs/${filename}`
    );
    const snapshot = await uploadBytesResumable(storageRef, fileBlob, {
      contentType: "application/pdf",
    });

    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateConsultation(consultationId, {
      analysis: { prescription: downloadURL },
    });
    return response.status(200).json({ analysisPrescription: downloadURL });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const generateRadiologiePrescription = async (request, response) => {
  try {
    const { consultationId } = request.body;
    const { radiologie } = request.body;
    const consultation = await getConsultationById(
      new Types.ObjectId(consultationId)
    );
    const name = `${consultation.patient.lastname} ${consultation.patient.firstname}`;
    const filename = await generateAnalysisAndRadiologiePrescription(
      name,
      radiologie
    );
    const storage = getStorage();
    const storageRef = ref(storage, `files/${filename}`);

    const fileBlob = fs.readFileSync(
      `D:/Learning/Semestre 5/Bases de Données Objet Relationnelles/Projects/hospital-project/Backend/src/doctor/generated-pdfs/${filename}`
    );
    const snapshot = await uploadBytesResumable(storageRef, fileBlob, {
      contentType: "application/pdf",
    });

    const downloadURL = await getDownloadURL(snapshot.ref);
    await updateConsultation(consultationId, {
      radiologie: { prescription: downloadURL },
    });
    return response.status(200).json({ radiologiePrescription: downloadURL });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const addNotesToConsultation = async (request, response) => {
  try {
    const { consultationId, notes } = request.body;
    const consultation = await updateConsultation(consultationId, { notes });
    return response.status(200).json({ notes });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    console.log("***********", req.query.id);
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

export const getDoctorById = async (req, res) => {
  try {
    console.log("***********", req.query.id);
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
