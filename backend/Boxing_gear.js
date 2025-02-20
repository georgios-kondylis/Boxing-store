import mongoose from "mongoose";

const MONGO_URI_Boxing_gear = process.env.MONGO_URI_Boxing_gear;
const boxing_gearConnection = mongoose.createConnection(MONGO_URI_Boxing_gear);

// Schema for Boxing Shoes
const boxingHeadGearSchema = new mongoose.Schema({
  brand: String,
  price: Number,
  img: [String], 
  liked: { type: Boolean, default: false },
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
})

// Schema for Boxing Shoes
const boxingShoesSchema = new mongoose.Schema({
  brand: String,
  sizes: {type: [Number], default: [37, 38, 39, 40, 41, 42, 43, 44, 45]},
  price: Number,
  img: [String], 
  liked: { type: Boolean, default: false },
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
});

// Schema for Boxing Gloves
const boxingGlovesSchema = new mongoose.Schema({
  brand: String,
  weight: Number, 
  price: Number,
  img: [String], // Array of image URLs
  liked: { type: Boolean, default: false },
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
});

// Export both models
export const boxingShoeModel = boxing_gearConnection.model("boxingShoeModel", boxingShoesSchema, "boxing-shoes");
export const boxingGloveModel = boxing_gearConnection.model("boxingGloveModel", boxingGlovesSchema, "boxing-gloves");
export const headGearModel = boxing_gearConnection.model("headGearModel", boxingHeadGearSchema, "headgears");


