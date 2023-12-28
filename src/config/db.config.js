import { connect } from "mongoose";
import {DB_URL} from '../../env.js';

const connectToDB = async () => {
  try {
    await connect(process.env.DB_URL || DB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
