import express from "express";
import { createVehicleController } from "../controllers/vehicleController.js";
import { requireSignIn } from "../middelwares/AuthMiddelware.js";

const router = express.Router();

// CREATE VEHICLE || POST
router.post("/create-vehicle",requireSignIn, createVehicleController);

export default router;
