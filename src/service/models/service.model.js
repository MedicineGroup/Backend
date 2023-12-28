import { model, Schema } from "mongoose";

const Service = model(
  "Service",
  new Schema({
    name: String,
    detail: String,
    thumbnailImage: String,
  })
);

export default Service;

const servicesData = [
  {
    name: "Cardiology",
    detail:
      "Specialized service in the diagnosis and treatment of heart diseases.",
    thumbnailImage:
      "https://www.concilio.com/wp-content/uploads/cardiologie-concilio-votre-conciergerie-medicale_718x452.jpg",
  },
  {
    name: "Endocrinology",
    detail:
      "Specialized service in the diagnosis and treatment of endocrine disorders.",
    thumbnailImage:
      "https://cdn2.tqsan.com/v2/images/procedures/550/endocrinologie-57555.jpg.webp",
  },
  {
    name: "Rheumatology",
    detail:
      "Specialized service in the diagnosis and treatment of rheumatic diseases.",
    thumbnailImage:
      "https://med.works/wp-content/uploads/2020/10/rhumatologue-doctolis.jpg",
  },
];

export const seedServices = async () => {
  try {
    const existingServices = await Service.find();

    if (existingServices.length > 0) {
      console.log("Services data already exists. Skipping seeding.");
      return;
    }

    for (const serviceData of servicesData) {
      const service = new Service(serviceData);
      await service.save();
    }

    console.log("Services inserted successfully");
  } catch (error) {
    console.log(error);
  }
};

