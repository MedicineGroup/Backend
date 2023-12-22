import { model, Schema } from "mongoose";

const Consultation = model(
  "Consultation",
  new Schema({
    date: Date,
    state: String,
    startTime: String,
    duration: { type: Number, enum: [15, 30], default: 30 },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

export default Consultation;
