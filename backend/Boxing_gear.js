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
  sizes: {type: [Number], default: []},
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

// Export both models
export const boxingShoeModel = boxing_gearConnection.model("boxingShoeModel", boxingShoesSchema, "boxing-shoes");
export const boxingGloveModel = boxing_gearConnection.model("boxingGloveModel", boxingGlovesSchema, "boxing-gloves");
export const headGearModel = boxing_gearConnection.model("headGearModel", boxingHeadGearSchema, "headgears");
export const boxingGearModel = boxing_gearConnection.model("boxingGearModel", boxingGearAllSchema, "boxingGearModels");


