import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    const user= await User.findOne({ email });
    return user;
  } catch (error) {
    console.log("Error in User DAO: findUserByEmail: ", error.message);
    throw new Error(error);
  }
};

export const addUser = async (newUser) => {
  try {
    const user = new User({ ...newUser });
    return await user.save();
  } catch (error) {
    console.log("Error in User DAO: addUser: ", error);
    throw new Error(error);
  }
};
