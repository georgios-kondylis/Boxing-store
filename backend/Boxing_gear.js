import mongoose from "mongoose";

const MONGO_URI_Boxing_gear = process.env.MONGO_URI_Boxing_gear;
const boxing_gearConnection = mongoose.createConnection(MONGO_URI_Boxing_gear);

const boxingGearAllSchema = new mongoose.Schema({
  category: {type: String, default: 'Undefined'},
  brand: {type: String, default: 'Undefined'},
  weight: {type: Number, default: 0},
  price: {type: Number, default: 0},
  sizes: {type: [Number], default: []},
  img: {type: [String], default: []}, // Array of image URLs
  liked: { type: Boolean, default: false },
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
})

export const boxingGearModel = boxing_gearConnection.model("boxingGearModel", boxingGearAllSchema, "boxingGearModels");


