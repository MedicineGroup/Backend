// models/doctor.model.js
import { model, Schema } from "mongoose";
import { hashPassword } from "../../utils/auth.utils.js";

const Doctor = model(
  "Doctor",
  new Schema({
    nom: String,
    detail: String,
    email: String,
    password: String,
    image: String,
    service: {
      type: Schema.Types.String,
      ref: "Service", // Référence au modèle Service
    },
    patients: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
  })
);

export default Doctor;

const doctorsData = [
  // Cardiology
  {
    nom: "Dr. Smith",
    detail: "Cardiologist with years of experience.",
    email: "dr.smith@example.com",
    password: "password123",
    service: "Cardiology",
    patients: ["65786ab5ebbee4ee27b51ac3","6585839ff4d595e5b2f7a644"]
  },
  {
    nom: "Dr. Johnson",
    detail: "Expert in heart health and cardiovascular diseases.",
    email: "dr.johnson@example.com",
    password: "password456",
    service: "Cardiology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
  {
    nom: "Dr. Williams",
    detail: "Passionate about preventing heart-related issues.",
    email: "dr.williams@example.com",
    password: "password789",
    service: "Cardiology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },

  // Endocrinology
  {
    nom: "Dr. Davis",
    detail: "Endocrinologist specializing in hormonal disorders.",
    email: "dr.davis@example.com",
    password: "password321",
    service: "Endocrinology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
  {
    nom: "Dr. Brown",
    detail: "Dedicated to managing endocrine conditions.",
    email: "dr.brown@example.com",
    password: "password654",
    service: "Endocrinology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
  {
    nom: "Dr. Miller",
    detail: "Expert in the treatment of thyroid disorders.",
    email: "dr.miller@example.com",
    password: "password987",
    service: "Endocrinology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },

  // Rheumatology
  {
    nom: "Dr. Wilson",
    detail: "Rheumatologist specializing in arthritis and joint diseases.",
    email: "dr.wilson@example.com",
    password: "password135",
    service: "Rheumatology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
  {
    nom: "Dr. Moore",
    detail: "Committed to providing relief for rheumatic conditions.",
    email: "dr.moore@example.com",
    password: "password246",
    service: "Rheumatology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
  {
    nom: "Dr. Taylor",
    detail: "Experienced in the treatment of musculoskeletal disorders.",
    email: "dr.taylor@example.com",
    password: "password789",
    service: "Rheumatology",
    patients: ["65786ab5ebbee4ee27b51ac3"]
  },
];

export const seedDoctors = async () => {
  try {
    await Doctor.deleteMany();
    doctorsData.forEach(async (doctorData) => {
      doctorData.password = await hashPassword(doctorData.password);
      const doctor = new Doctor(doctorData);
      await doctor.save();
    });
    console.log("Doctor data seeded");
  } catch (error) {
    console.log(error);
  }
};