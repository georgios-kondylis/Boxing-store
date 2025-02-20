
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Boxers from "./components/Boxers";
import Gloves from "./components/Gloves";
import Mouthpiece from "./components/Mouthpiece";
import Wraps from "./components/Wraps";
import Shoes from "./components/Shoes";
import HeadGear from "./components/HeadGear";
import { useState } from "react";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);

    // Fetch Cart Data
    const fetchCartData = async () => {
      try {
        const res = await fetch('http://localhost:5000/add-to-cart');
        const cardDataInJson = await res.json();
        setCartItems(cardDataInJson);
        setCartLength(cardDataInJson.length);
        console.log('cartUpdate')
      } catch (err) {
        console.log(`Error fetching cart: ${err}`);
      }
    };



  return (
    <BrowserRouter>
        <Navbar fetchCartData={fetchCartData} cartLength={cartLength} cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} cartItems={cartItems} setCartItems={setCartItems}/>

        <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/gloves" element={<Gloves fetchCartData={fetchCartData} setCartIsOpen={setCartIsOpen} cartIsOpen={cartIsOpen}/>}/>
          <Route path="/mouthpiece" element={<Mouthpiece/>}/>
          <Route path="/headgear" element={<HeadGear/>}/>
          <Route path="/wraps" element={<Wraps/>}/>
          <Route path="/shoes" element={<Shoes/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

//  https://g-kondylis.imgbb.com/   Is the image cloud im using for the mongoDB pictures

// TO DO 
// i have to have all my action in one Collection and give them filter of Categorie then use Query selector 
// to render diferrent items fy filtering this category property.
// Cart will be a different collection with get to render, post to be able to add, and delete endponts;
// and favourites will render everything where the property of like is true