import { model, Schema } from "mongoose";

const Consultation = model(
  "Consultation",
  new Schema({
    date: Date,
    state: String,
    startTime: String,
    duration: { type: Number, enum: [15, 30], default: 30 },
    prescription: String,
    analysis: {
      prescription: String,
      results: String,
    },
    radiologies: {
      prescription: String,
      results: String,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    notes: String,
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

export default Consultation;
