import Consultation from "../models/consulation.model.js";
export const getAll = async (patientId) => {
  try {
    return Consultation.find({ patient: patientId }).populate("doctor patient");
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
      "Error in Doctor DAO: getConsultationsDatesByDoctorID: " + error;
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
      "Error in Doctor DAO: getDoctorConsultationByDateRange: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};
