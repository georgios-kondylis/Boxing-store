import mongoose from "mongoose";

const MONGO_URI_Boxing_gear = process.env.MONGO_URI_Boxing_gear;
const boxing_gearConnection = mongoose.createConnection(MONGO_URI_Boxing_gear);

// Schema for Boxing Shoes
const boxingShoesSchema = new mongoose.Schema({
  brand: String,
  price: Number,
});

// Schema for Boxing Gloves
const boxingGlovesSchema = new mongoose.Schema({
  brand: String,
  weight: Number, 
  price: Number,
  img: [String], // Array of image URLs
  liked: { type: Boolean, default: false },
});

// Export both models
export const boxingShoeModel = boxing_gearConnection.model("boxingShoeModel", boxingShoesSchema, "boxing-shoes");
export const boxingGloveModel = boxing_gearConnection.model("boxingGloveModel", boxingGlovesSchema, "boxing-gloves");


