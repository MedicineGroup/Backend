import Consultation from "../models/consulation.model.js";
export const getAll = async (patient) => {
  try {
    return Consultation.find({ patient: patient._id }).populate("doctor");
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
