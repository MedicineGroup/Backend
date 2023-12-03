import bcrypt from "bcryptjs";

const { hash } = bcrypt;
export const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};
