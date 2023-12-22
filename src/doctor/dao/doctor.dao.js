// dao/doctor.dao.js
import Doctor from "../models/doctor.model.js";
import Consultation from "../../consultation/models/consulation.model.js";

export const findDoctorByEmail = async (email) => {
  try {
    return await Doctor.findOne({ email });
  } catch (error) {
    const msg = "Error in Doctor DAO: findDoctorByEmail: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getAllDoctorsByService = async (service) => {
  try {
    const doctors = await Doctor.find({ service }).select(
      "-password -patients"
    );
    return doctors;
  } catch (error) {
    const msg = "Error in Doctor DAO: getAllDoctorsByService: " + error;
    console.log(msg);
    throw new Error(msg);
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

export const getBookedTimesByDoctorAndDate = async (doctorId, date) => {
  try {
    return await Consultation.find({
      doctor: doctorId,
      date,
    }).select("startTime duration");
  } catch (error) {
    const msg = "Error in Doctor DAO: getBookedTimesByDoctorAndDate: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};
