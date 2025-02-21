import "dotenv/config";
import express from "express";
import cors from "cors";
import { boxingShoeModel, boxingGloveModel, headGearModel, boxingGearModel } from "./Boxing_gear.js";
import { Cart } from "./Cart.js";

// Routes
import boxerRoutes from "./routes/boxerRoutes.js";  // Import the boxerRoutes
import boxingShoesRoute from "./routes/BoxingShoesRoutes.js"; // import the routes to render boxing shoes
import boxingGlovesRoutes from "./routes/BoxingGlovesRoutes.js"; 
import cartRoutes from "./routes/cartRoutes.js"; 
import boxingGearRoutes from "./routes/BoxingGearRoutes.js"; 


const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({ limit: '10mb' }));  // Increase the limit for the body parser middleware
app.use(cors());

app.use('/allBoxingGear', boxingGearRoutes)     // http://localhost:5000/allBoxingGear
app.use('/boxers', boxerRoutes);
app.use('/boxing_shoes', boxingShoesRoute);
app.use('/boxing_gloves', boxingGlovesRoutes);  // http://localhost:5000/boxing_gloves
app.use('/add-to-cart', cartRoutes);            // http://localhost:5000/add-to-cart


const createBoxingGear = async () => {
  try {
    const boxingGear = [
      // HeadGears 
      // { category: 'headgear', brand: "Hit & Move", price: 320,liked: false, img: ['https://i.ibb.co/yJNn1S7/headgeargal21-666af375206c0.png'] },
      // { category: 'headgear', brand: "Hit & Move", price: 320, liked: false, img: ['https://i.ibb.co/r2K6psvy/headgeargal11-666af3750a04f-1200x960.png'] },
      // { category: 'headgear', brand: "Adidas", price: 120, liked: false, img: ['https://i.ibb.co/nycXJQ1/adidas.png'] },
      // { category: 'headgear', brand: "Hayabusa", price: 250, liked: false, img: ['https://i.ibb.co/k2mdsGLP/hayabusa-WT.png'] },
      // { category: 'headgear', brand: "Hayabusa", rice: 250, liked: false, img: ['https://i.ibb.co/60zCtwbx/hayabusa.png'] },
      // { category: 'headgear', brand: "Everlast", price: 100,liked: false, img: ['https://i.ibb.co/JZcNzLK/everlast.png'] },
      // // ------------
      // // Gloves
      // { category: 'gloves', brand: "Hit & Move", price: 240, weight: 16, img: ['https://i.ibb.co/jkRNb4Kc/hitNmove.png'] },
      // { category: 'gloves', brand: "Hit & Move", price: 240, weight: 14, img: ['https://i.ibb.co/d423wX9P/hit-Nmove-Red.png'] },
      // { category: 'gloves', brand: "Venum", price: 80, weight: 12, img: ['https://i.ibb.co/wZv9H4LG/venum-Gloves.png'] },
      // { category: 'gloves', brand: "Hayabusa", price: 210, weight: 14, img: ['https://i.ibb.co/nqp78CPq/haya-Gloves-Br.png'] },
      // { category: 'gloves', brand: "Hayabusa", price: 210, weight: 16, img: ['https://i.ibb.co/Z1HLrFH8/haya-Gloves.png'] },
      // { category: 'gloves', brand: "Everlast", price: 90, weight: 14, img: ['https://i.ibb.co/1thNTsWP/everlast-Black.png'] },
      // // ------------
      // Shoes
      { category: 'shoes', brand: "Venum", price: 120, sizes: [42, 43, 44, 45], img: ['https://i.ibb.co/QvtPB9Rr/Black-White-Gold-Venum-Elite-Boxing-Shoes-AMZ.png'] },
      { category: 'shoes', brand: "Venum", price: 120, sizes: [41, 42, 43, 44], img: ['https://i.ibb.co/q3hK0mmR/VENUM-04958-603-R-Venum-Contender-Boxing-Shoes-Black-Gold-Red.png'] },
      { category: 'shoes', brand: "Venum", price: 120, sizes: [41, 42, 43, 44, 45], img: ['https://i.ibb.co/20QQ3c2m/venum-contender-boxing-shoes-black-gold-1.png'] },
      { category: 'shoes', brand: "Nike", price: 210, sizes: [41, 42, 43, 44], img: ['https://i.ibb.co/3YB7bwDg/nike-machomai-boxing-shoes-white-black-1.png'] },
      { category: 'shoes', brand: "Nike", price: 210, sizes: [41, 42, 43, 44, 45], img: ['https://i.ibb.co/8D7Pn5SM/Nike-Machomai-2-Boxing-Boots-Black-White.png'] },
      { category: 'shoes', brand: "Everlast", price: 90, sizes: [41, 42, 43, 44], img: ['https://i.ibb.co/7d7N7pQV/everlast-ultimate-boxing-shoes-black-1.png'] },
      { category: 'shoes', brand: "Everlast", price: 120, sizes: [ 42, 43, 44, 45], img: ['https://i.ibb.co/DPkJg1mC/411j0-RNn-Ou-L-AC.png'] },
      { category: 'shoes', brand: "Adidas", price: 210, sizes: [ 42, 43, 44, 45], img: ['https://i.ibb.co/M5tp98rg/51-Udba-MFl-HL-AC-SY675.png'] },
      { category: 'shoes', brand: "Adidas", price: 210, sizes: [41, 42, 43, 44,], img: ['https://i.ibb.co/hJf7wtC0/54868081-17-D1-4-A09-97-AF-D0310-A7-AFD0-D-06492.png'] },
      // // ------------
      // // Wraps
      //  { category: 'wraps', brand: "Venum", price: 12, img: ['https://i.ibb.co/WpKNBwZ0/v-Wraps-Red.png'] },
      //  { category: 'wraps', brand: "Venum", price: 12, img: ['https://i.ibb.co/fz3QHtZX/eu-venum-0429-blue-venum-kontact-boxing-handwraps-4-m-blue-1.png'] },
      //  { category: 'wraps', brand: "Venum", price: 12, img: ['https://i.ibb.co/0p5pDqhf/BOXING-HANDWRAPS-BLACK-HD-01-f6d3912f-498a-466c-859b-8d4df022cb63.png'] },
      //  { category: 'wraps', brand: "Adidas", price: 16, img: ['https://i.ibb.co/Gj8TkF3/6.png'] },
      //  { category: 'wraps', brand: "Hayabusa", price: 21, img: ['https://i.ibb.co/NgnwMFT5/haya-Wraps.png'] },
      //  // ------------
      //  // Wraps
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/HTQz27nn/1.png'] },
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/QvHNdgJf/4.png'] },
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/Rksr2J5f/protector-bucal-venum-challenger-negro-amarillo-5-4406.png'] },
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/cKMGPCRf/protector-bucal-venum-challenger-negro-azul-4-6609.png'] },
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/8DXK8wHm/2.png'] },
      // { category: 'mouthpiece', brand: "Venum", price: 12, img: ['https://i.ibb.co/2YNj990Y/3.png'] },
    ] 
    const create = await boxingGearModel.insertMany(boxingGear);
    console.log(` ${create.length} new items added:`);
  } catch (err) {
    console.log('Malakia kati pige strava',err)
  }
}
createBoxingGear();

const updateGear = async (brand, oldPrice, newPrice) => {
  try {
    const updatedGear = await boxingGearModel.findOneAndUpdate(
      { brand: brand, price: oldPrice },  // Find gear with the brand and old price (0)
      { price: newPrice },                // Update price to the new price (250)
      { new: true }                       // Return the updated document
    );
    console.log('Updated Gear:', updatedGear);
  } catch (error) {
    console.error("Error updating gear:", error);
  }
};
// updateGear('Hayabusa', 0, 250);

const checkShoes = await boxingGloveModel.find({ category: "shoes" });
console.log(checkShoes);

//------------ Start the Server -------------
const startServer = async () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} eimai gamatos`)
  );
};
startServer();
