import { connect } from "mongoose";

const connectToDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/mediplus");
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
