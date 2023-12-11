import { model, Schema } from "mongoose";

const Consultation = model(
  "Consultation",
  new Schema({
    date: Date,
    doctor: String,
    state: String,
    patient:{
        type: Schema.Types.ObjectId,
        ref:"User"
    } 
  })
);

export default Consultation;
