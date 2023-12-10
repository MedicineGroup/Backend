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
  })
);

export default User;
