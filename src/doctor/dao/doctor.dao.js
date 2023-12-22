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
