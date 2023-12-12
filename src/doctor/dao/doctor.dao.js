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

  static async getAllDoctorsByServiceId(serviceId) {
    try {
      const doctors = await Doctor.find({ serviceId });
      return doctors;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
}
export default DoctorDAO;