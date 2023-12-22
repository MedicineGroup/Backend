import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
    firstname: String,
    lastname: String,
    profileImage: String,
    email: String,
    password: String,
    dateOfBirth: Date,
    address: String,
    gender: String,
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  })
);

export default User;
