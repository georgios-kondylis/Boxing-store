
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Gloves from "./components/Gloves";
import { useState } from "react";
import Home from "./components/Home";

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
        // console.log('cartUpdate')
      } catch (err) {
        console.log(`Error fetching cart: ${err}`);
      }
    };



  return (
    <BrowserRouter>
        <Navbar fetchCartData={fetchCartData} 
                cartLength={cartLength} 
                cartIsOpen={cartIsOpen} 
                setCartIsOpen={setCartIsOpen} 
                cartItems={cartItems} 
                setCartItems={setCartItems}
          />

        <Routes>
          <Route path="/" element={<Home 
                 fetchCartData={fetchCartData} 
                 setCartIsOpen={setCartIsOpen} 
                 cartIsOpen={cartIsOpen}/>
              }/>
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