
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [boxingGear, setBoxingGear] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [favsIsOpen, setFavsIsOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [likedItems, setLikedItems] = useState([]);
  const [justAddedItem, setJustAddedItem] = useState(null);

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

    const fetchLiked = async () => {
      try {
        const response = await fetch("http://localhost:5000/allBoxingGear");
        const data = await response.json();
        const liked = data.filter((item) => item.liked === true);
        setLikedItems(liked);
        console.log(likedItems)
      } catch (error) {
        console.error("Error fetching gear:", error);
      } 
    };

    const handleLike = async (item) => {
      try {
        const updatedLikedStatus = !item.liked;  // Toggle liked status
    
        // Update the state for the specific item in boxingGear
        setBoxingGear((prevGear) =>
          prevGear.map((gear) =>
            gear._id === item._id ? { ...gear, liked: updatedLikedStatus } : gear  // Only update the clicked item
          )
        );
        fetchLiked();
    
        // Now make the PUT request to update the backend
        const response = await fetch("http://localhost:5000/allBoxingGear", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: item._id }),  // Send the item ID to toggle the liked status
        });
        const result = await response.json();
        if (!response.ok) {
          console.error("Failed to update like status:", result.error);
        }
        fetchLiked();
      } catch (error) {
        console.error("Error toggling like status:", error);
      }
    };

    const handleAddToCart = async (item) => {
      try {
        const response = await fetch("http://localhost:5000/add-to-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: item.category,
            brand: item.brand,
            weight: item.weight,
            price: item.price,
            sizes: item.sizes,
            img: item.img[0],
            liked: item.liked,
            description: item.description,
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          fetchCartData();
          console.log("Item added to cart:", result.cartItem);
          setJustAddedItem(item._id); 
          setTimeout(() => setJustAddedItem(null), 1000);
        } else {
          console.error("Failed to add to cart:", result.error);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    };

  return (
    <BrowserRouter>
        <Navbar fetchCartData={fetchCartData} 
                handleAddToCart={handleAddToCart}
                justAddedItem={justAddedItem} setJustAddedItem={setJustAddedItem}
                cartLength={cartLength} 
                cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} 
                favsIsOpen={favsIsOpen} setFavsIsOpen={setFavsIsOpen}
                cartItems={cartItems} 
                setCartItems={setCartItems}
                likedItems={likedItems}
                handleLike={handleLike}
          />

        <Routes>
          <Route path="/" element={<Home 
                 boxingGear={boxingGear} setBoxingGear={setBoxingGear}
                 fetchCartData={fetchCartData} 
                 setCartIsOpen={setCartIsOpen} 
                 setFavsIsOpen={setFavsIsOpen}
                 cartIsOpen={cartIsOpen}
                 likedItems={likedItems} setLikedItems={setLikedItems}
                 fetchLiked={fetchLiked}
                 handleLike={handleLike}
                 justAddedItem={justAddedItem} setJustAddedItem={setJustAddedItem}
                 handleAddToCart={handleAddToCart} />
              }/>
          <Route path="/product/:id" element={<ProductDetails 
                 fetchCartData={fetchCartData} 
                 setCartIsOpen={setCartIsOpen} 
                 setFavsIsOpen={setFavsIsOpen}
                 cartIsOpen={cartIsOpen}
                 likedItems={likedItems} setLikedItems={setLikedItems}
                 fetchLiked={fetchLiked}
                 handleLike={handleLike}
                 justAddedItem={justAddedItem} setJustAddedItem={setJustAddedItem}
                 handleAddToCart={handleAddToCart} />
              }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

//  https://g-kondylis.imgbb.com/   Is the image cloud im using for the mongoDB pictures
