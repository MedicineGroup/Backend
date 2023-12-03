import { model, Schema } from "mongoose";

const User = model(
  "User",
  new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  })
);

export default User;
