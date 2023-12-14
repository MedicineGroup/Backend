// dao/doctor.dao.js
import Doctor from "../models/doctor.model.js";

class DoctorDAO {
  static async addDoctor(doctorData) {
    try {
      const newDoctor = new Doctor(doctorData);
      const savedDoctor = await newDoctor.save();
      return savedDoctor;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllDoctorsByService(service) {
    try {
      const doctors = await Doctor.find({ service});
      return doctors;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}
export default DoctorDAO;