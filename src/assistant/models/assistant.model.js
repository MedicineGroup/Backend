import { model, Schema } from "mongoose";

const Assistant = model(
  "Assistant",
  new Schema({
    firstname: String,
    lastname: String,
    profileImage: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    address: String,
    gender: String,
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
  })
);

export default Assistant;
