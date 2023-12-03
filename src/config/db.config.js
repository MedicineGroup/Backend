import { connect } from "mongoose";

const connectToDB = async () => {
  try {
    await connect("mongodb://localhost:27017/mediplus");
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
