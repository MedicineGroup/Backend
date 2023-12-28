import User from "../models/user.model.js";

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
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

export const update = async (email, userInfos) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ email }, userInfos, {
      new: true,
    });
    return updatedUser._doc;
  } catch (error) {
    console.log("Error in User DAO: updateUserInfos: ", error);
    throw new Error(error);
  }
};

export const addDoctor = async (userId, doctorId) => {
  try {
    return await User.findByIdAndUpdate(userId, {
      $addToSet: { doctors: doctorId },
    });
  } catch (error) {
    console.log("Error in User DAO: addDoctor: ", error);
    throw new Error(error);
  }
};

export const getDoctorsByUserEmail = async (email) => {
  try {
    return await User.findOne({ email })
      .populate("doctors")
      .select("-password -patients");
  } catch (error) {
    console.log("Error in User DAO: getDoctorsByUserEmail: ", error);
    throw new Error(error);
  }
};
