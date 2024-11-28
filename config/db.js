import mongoose from "mongoose";
import { encryptPassword } from "../helpers/authHelper.js";
import User from "../models/userModel.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected to ${conn.connection.host}`);
    // Seeder
    try {
      const usersCount = await User.countDocuments();
      if (usersCount === 0) {
        const email = "Amjad@desolint.com";
        const password = "123456abc";
        const hashedPassword = await encryptPassword(password);

        const defaultUser = {
          email,
          password: hashedPassword,
        };

        const user = await User.create(defaultUser);
        console.log("Default user created");
      } else {
        console.log("Default user already created");
      }
    } catch (err) {
      console.log("Error in seeder", err);
    }
  } catch (err) {
    console.log("Error connecting database");
  }
};

export default connectDB;
