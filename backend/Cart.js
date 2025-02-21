import mongoose from "mongoose";

const MONGO_URI_Boxing_gear = process.env.MONGO_URI_Boxing_gear;
const boxing_gearConnection = mongoose.createConnection(MONGO_URI_Boxing_gear);

const cartSchema = new mongoose.Schema({
  category: String,
  brand: String,
  weight: Number, 
  sizes:  {type: [Number], default: [] },
  liked: Boolean,
  price: Number,
  img: [String],
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
});

const favouritesSchema = new mongoose.Schema({
  category: String,
  brand: String,
  weight: Number, 
  sizes: {type: [Number], default: [] },
  liked: Boolean,
  price: Number,
  img: [String],
  description: {type: String, default: 'No description provided by Georgios, olo malakies kanei.'},
});



export const Cart = boxing_gearConnection.model('cart', cartSchema, 'cart');
export const favourites = boxing_gearConnection.model('favourites', favouritesSchema, 'favourites');