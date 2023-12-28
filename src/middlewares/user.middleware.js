import { findUserByEmail } from "../user/dao/user.dao.js";

export const checkUserEmailExistance = async (request, response, next) => {
  try {
    const userEmail = request.auth.email;
    const user = await findUserByEmail(userEmail);
    if (!user) {
      return response.status(404).json({ message: "User doesn't found" });
    }
    next();
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "An internal server error has occured" });
  }
};
