import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    carModel: {
      type: String,
      required: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    phone: {
      type: String,
      required: true,
      length: 11,
    },
    city: {
      type: String,
      required: true,
    },
    maxPictures: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    images: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
