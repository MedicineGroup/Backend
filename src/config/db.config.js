import { connect } from "mongoose";

const connectToDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
