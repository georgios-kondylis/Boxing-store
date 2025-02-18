import "dotenv/config";
import express from "express";
import cors from "cors";
import { boxerModel } from "./Boxer.js";
import { boxingShoeModel, boxingGloveModel } from "./Boxing_gear.js";
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

const createBoxingGloves = async () => { 
    try {
      const gloves = [
        { brand: "Raja", weight: 10, price: 140, img: ['https://i.ibb.co/2YNQSLp3/raja-Black.png'] },
        { brand: "Raja", weight: 14, price: 140, img: ['https://i.ibb.co/N2065rX7/rajaRed.jpg'] },
      ];
      
      const result = await boxingGloveModel.insertMany(gloves); // Mongoose handles creating the model instances, no need to type new boxingGloveModel() before each new model
      console.log(` ${result.length} new Gloves added:`, result);
    } catch (error) {
      console.log("Error adding boxing glove:", error);
    }
  };
  // createBoxingGloves();

//------------ Start the Server -------------
const startServer = async () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} eimai gamatos`)
  );
};
startServer();
