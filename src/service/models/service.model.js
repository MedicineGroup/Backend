import { model, Schema } from "mongoose";

const Service = model(
  "Service",
  new Schema({
    nom: String,
    detail: String,
  })
);

export default Service;
