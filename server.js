import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

// Dot env config
dotenv.config();

// DB Coonnection
connectDB();

// App
const app = express();

// CORS Configuration
const corsOptions = {
  origin: ["", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// Middelwares
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/vehicle", vehicleRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (err, origin) => {
  console.error(`Uncaught Exception: ${err.message}`);
  console.error(`Exception Origin: ${origin}`);
  process.exit(1);
});
