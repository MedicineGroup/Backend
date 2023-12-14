// models/doctor.model.js
import { model, Schema } from "mongoose";

const Doctor = model(
  "Doctor",
  new Schema({
    nom: String,
    detail: String,
    service: {
      type: Schema.Types.String,
      ref: "Service", // Référence au modèle Service
    },
  })
);

export default Doctor;
