import Service from "../models/service.model.js";

class ServiceDAO {
  static async addService(serviceData) {
    try {
      const newService = new Service(serviceData);
      const savedService = await newService.save();
      return savedService;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllServices() {
    try {
      const services = await Service.find();
      return services;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ServiceDAO;
