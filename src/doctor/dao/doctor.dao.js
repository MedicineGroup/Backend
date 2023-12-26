// dao/doctor.dao.js
import Doctor from "../models/doctor.model.js";
import User from "../../user/models/user.model.js";
import Consultation from "../../consultation/models/consulation.model.js";

export const findDoctorByEmail = async (email) => {
  try {
    return await Doctor.findOne({ email });
  } catch (error) {
    console.log("Error in User DAO: findDoctorByEmail: ", error.message);
    throw new Error(error);
  }
};

export const getAllDoctorsByService = async (service) => {
  try {
    const doctors = await Doctor.find({ service });
    return doctors;
  } catch (error) {
    throw new Error(error.message);
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
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1); // Get the next day

    return await Consultation.find({
      doctor: doctorId,
      date: { $gte: new Date(date), $lt: nextDate },
    }).select("startTime");
  } catch (error) {
    const msg = "Error in Doctor DAO: getBookedTimesByDoctorAndDate: " + error;
    console.log(msg);
    throw new Error(msg);
  }
};

export const getPatientsByDoctorEmail = async (email) => {
  try {
    // Recherche du médecin par e-mail
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      console.log(doctor);
      const patientDetails = await User.find({ _id: { $in: doctor.patients } });
      return patientDetails;
    } else {
      throw new Error("Doctor not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
