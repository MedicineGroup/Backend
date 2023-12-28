import Consultation from "../models/consulation.model.js";
import { CONSULTATION_STATE } from "../../utils/constantes.js";
export const getAll = async (patientId) => {
  try {
    return Consultation.find({ patient: patientId }).populate("doctor patient");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
export const getAllConstDoct = async (doctorId) => {
  try {
    return Consultation.find({ doctor: doctorId })
    .populate("doctor")
    .populate("patient");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
export const findAllConsultationsAssitant = async (doctorId) => {
  try {
    return Consultation.find({ doctor: doctorId }).populate("doctor patient");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
export const addConsultation = async (newConsultation) => {
  try {
    const consulation = new Consultation({ ...newConsultation });
    return await consulation.save();
  } catch (error) {
    console.log(err);
    throw new Error(err);
  }
};

export const getConsultationsDatesByDoctorID = async (doctorId) => {
  try {
    return await Consultation.find({
      doctor: doctorId,
    }).select("date startTime duration");
  } catch (error) {
    const msg =
      "Error in consultation DAO: getConsultationsDatesByDoctorID: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getDoctorConsultationByDateRange = async (
  doctorId,
  maxDate,
  minDate
) => {
  try {
    return await Consultation.find({
      doctor: doctorId,
      date: { $gte: minDate, $lt: maxDate },
    }).select("startTime -_id");
  } catch (error) {
    const msg =
      "Error in consultation DAO: getDoctorConsultationByDateRange: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getPatientConsultationByDateAndTime = async (
  patientId,
  startTime,
  minDate,
  maxDate
) => {
  try {
    return await Consultation.findOne({
      patient: patientId,
      startTime: startTime,
      date: { $gte: minDate, $lt: maxDate },
    })
      .populate("doctor")
      .select("-password -patients");
  } catch (error) {
    const msg =
      "Error in consultation DAO: getDoctorConsultationByDateRange: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getOngoingPatientConsultation = async (patientId, doctorId) => {
  try {
    return await Consultation.findOne({
      patient: patientId,
      doctor: doctorId,
      state: CONSULTATION_STATE.WATING_DOCTOR,
    });
  } catch (error) {
    const msg =
      "Error in consultation DAO: getOngoingPatientConsultation: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const updateConsultation = async (consultationId, consultationInfos) => {
  try {
    return await Consultation.findByIdAndUpdate(consultationId, {
      ...consultationInfos,
    });
  } catch (error) {
    const msg = "Error in consultation DAO: updateConsultation: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getConsultationById = async (consultationId) => {
  try {
    return await Consultation.findById(consultationId).populate(
      "doctor patient"
    );
  } catch (error) {
    const msg = "Error in consultation DAO: updateConsultation: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};
