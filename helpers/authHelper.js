import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  } catch (err) {
    console.log("Error encrypting password", err);
  }
};

export const decryptPassword = async (password, hashedPassword) => {
  try {
    const decryptedPassword = await bcrypt.compare(password, hashedPassword);
    return decryptedPassword;
  } catch (err) {
    console.log("Error encrypting password", err);
  }
};
