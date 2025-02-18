import mongoose from "mongoose";

const MONGO_URI_Boxing_gear = process.env.MONGO_URI_Boxing_gear;
const boxing_gearConnection = mongoose.createConnection(MONGO_URI_Boxing_gear);

const cartSchema = new mongoose.Schema({
  brand: String,
  weight: Number, 
  price: Number,
  img: [String],
});

export const Cart = boxing_gearConnection.model('cart', cartSchema, 'cart')