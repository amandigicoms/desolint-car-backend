import formidable from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Vehicle from "../models/vehicleModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const validateVehicleFields = (carModel, price, phone, maxPictures, city) => {
  if (!carModel || carModel.length < 3) {
    throw new Error("Car model must be at least 3 characters long");
  }

  if (!price || price <= 0) {
    throw new Error("Price must be a positive number");
  }

  if (!phone || phone.length !== 11) {
    throw new Error("Phone number must be exactly 11 digits");
  }

  if (!city || city?.length <= 0 ) {
    throw new Error("City is required");
  }

  if (!maxPictures || maxPictures < 1 || maxPictures > 10) {
    throw new Error("Provide a maximum number of pictures from 1 - 10");
  }
};

const handleFormParsing = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      uploadDir: path.join(__dirname, "uploads"),
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });
};

// controller function for creating a vehicle
export const createVehicleController = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // FornData Parsing 
    const { fields, files } = await handleFormParsing(req);
    console.log('Fields', fields)

    // Extracting data
    const carModel = fields.carModel?.[0];
    const price = parseFloat(fields.price?.[0]);
    const phone = fields.phone?.[0];
    const maxPictures = parseInt(fields.maxPictures?.[0], 10);
    const city = fields.city?.[0]

    // Validation
    validateVehicleFields(carModel, price, phone, maxPictures, city);

    let images = files.images;
    if (!Array.isArray(images)) {
      images = [images];
    }

    const imageBuffers = images.map((image) => ({
      data: fs.readFileSync(image.filepath),
      contentType: image.mimetype,
    }));

    // Create record in datbaes
    const newVehicle = new Vehicle({
      carModel,
      price,
      phone,
      maxPictures,
      images: imageBuffers,
      user: user._id,
      city
    });

    await newVehicle.save();

    return res.status(201).json({
      message: "Vehicle created successfully",
      vehicle: newVehicle,
    });
  } catch (err) {
    console.error("Error while creating vehicle", err);
    return res.status(400).json({ message: err.message || "Internal Server Error" });
  }
};
