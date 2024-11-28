import jwt from "jsonwebtoken";
import { decryptPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required." });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required." });
    }

    // Find User
    const user = await User.findOne({ email });
    if (user) {
      // Decrypt password
      const isMatch = await decryptPassword(password, user?.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid credentials." });
      } else {
        // Create Token
        const token = await jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        return res.status(200).send({
          message: "Login Successfully.",
          user: {
            email,
            token,
          },
        });
      }
    } else {
      return res.status(400).send({ message: "Invalid credentials." });
    }
  } catch (err) {
    console.log("Error in Login controller", err);
  }
};
