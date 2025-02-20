import "dotenv/config";
import express from "express";
import cors from "cors";
import { boxingShoeModel, boxingGloveModel, headGearModel } from "./Boxing_gear.js";
import { Cart } from "./Cart.js";

// Routes
import boxerRoutes from "./routes/boxerRoutes.js";  // Import the boxerRoutes
import boxingShoesRoute from "./routes/BoxingShoesRoutes.js"; // import the routes to render boxing shoes
import boxingGlovesRoutes from "./routes/BoxingGlovesRoutes.js"; 
import cartRoutes from "./routes/cartRoutes.js"; 


const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '10mb' }));  // Increase the limit for the body parser middleware
app.use(cors());

app.use('/boxers', boxerRoutes);
app.use('/boxing_shoes', boxingShoesRoute);
app.use('/boxing_gloves', boxingGlovesRoutes);  // http://localhost:5000/boxing_gloves
app.use('/add-to-cart', cartRoutes);            // http://localhost:5000/add-to-cart

const createHeadgears = async () => {
  try {
    const headgears = [
      { brand: "Hit & Move", price: 320,liked: false, img: ['https://i.ibb.co/yJNn1S7/headgeargal21-666af375206c0.png'] },
      { brand: "Hit & Move", price: 320, liked: false, img: ['https://i.ibb.co/r2K6psvy/headgeargal11-666af3750a04f-1200x960.png'] },
      { brand: "Adidas", price: 120, liked: false, img: ['https://i.ibb.co/nycXJQ1/adidas.png'] },
      { brand: "Hayabusa", price: 250, liked: false, img: ['https://i.ibb.co/k2mdsGLP/hayabusa-WT.png'] },
      { brand: "Hayabusa", price: 250, liked: false, img: ['https://i.ibb.co/60zCtwbx/hayabusa.png'] },
      { brand: "Everlast", price: 100,liked: false, img: ['https://i.ibb.co/JZcNzLK/everlast.png'] },
    ]
    const create = await headGearModel.insertMany(headgears);
    console.log(` ${create.length} new Headgears added:`, create);
  } catch (err) {
    console.log("Error creating head-gears:", err)
  }
}
// createHeadgears();


const createBoxingGloves = async () => { 
    try {
      const gloves = [
        { brand: "Hayabusa", weight: 16, price: 290, img: ['https://i.ibb.co/Z1HLrFH8/haya-Gloves.png'] },
        { brand: "Hayabusa", weight: 14, price: 270, img: ['https://i.ibb.co/nqp78CPq/haya-Gloves-Br.png'] },
      ];
      const create = await boxingGloveModel.insertMany(gloves); // Mongoose handles creating the model instances, no need to type new boxingGloveModel() before each new model
      console.log(` ${create.length} new Gloves added:`, create);
    } catch (error) {
      console.log("Error adding boxing glove:", error);
    }
  };
  //  createBoxingGloves();

  const updateGlove = async (brand, weight, img) => {
    try {
      const updatedGlove = await boxingGloveModel.findOneAndUpdate(  
        { brand: brand, weight: weight}, // Find by brand & weight, first field is the criteria to find nd the second to update
        { img: img },                    // Update price, second object field are the update, 1 or more
        { new: true }                    // Return the updated document
      )
    } catch (error) {
      console.error("Error updating glove:", error);
    }
  }
  //  updateGlove('Raja', 16, 'https://i.ibb.co/Wvc6S06z/rajaBlue.png');

  const updateAllGloves = async () => {
    try {
      const updatedGloves = await boxingGloveModel.updateMany(
        {},
        { $set: {description: 'Premium Boxing Gloves – Power & Protection 🥊Designed for fighters of all levels, these durable gloves offer superior shock absorption, a secure Velcro strap for wrist support, and a breathable lining for comfort. Perfect for boxing, kickboxing, and Muay Thai.🔥 Train harder. Fight smarter.'} }
      );
      console.log("succes added descriptions")
    } catch (err) {
      console.log(`bro Wtf : ${err}`);
    }
  };
  // updateAllGloves();

//------------ Start the Server -------------
const startServer = async () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} eimai gamatos`)
  );
};
startServer();
