import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import ItemCard from "./ItemCard";
import { main_px, transition } from "../utils";
import { useSearchParams } from "react-router-dom";


const Home = ({ setCartIsOpen, cartIsOpen, fetchCartData}) => {
  const [boxingGear, setBoxingGear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItems, setHoveredItems] = useState({});
  const [justAddedItem, setJustAddedItem] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsCategory = searchParams.get("category");


  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await fetch("http://localhost:5000/allBoxingGear");
        const data = await response.json();
        const filteredGear = data.filter((item) => item.category === paramsCategory);
        setBoxingGear(filteredGear);
        // console.log('render')
      } catch (error) {
        console.error("Error fetching gear:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGear();
  }, [paramsCategory]);

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
        setTimeout(() => setJustAddedItem(null), 2000);
      } else {
        console.error("Failed to add to cart:", result.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
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
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };
  

  const handleMouseEnter = (id) => {
    setHoveredItems((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoveredItems((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="w-full bg-mainBg flex justify-center ">
      <div className={`min-h-screen flex flex-col w-full max-w-[1540px] overflow-x-hidden ${transition} ${main_px}`} onClick={() => setCartIsOpen(false)}>
        <h1 className="text-3xl font-semibold mb-6 mx-auto text-white">Boxing Gear</h1>

        <div className="grid xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (// SKELETON-LOADER
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white flex flex-col justify-between border h-[400px] px-[20px] py-[10px] rounded-lg shadow-md">
                <Skeleton variant="text" width={130} height={40} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
                <Skeleton variant="rectangular" width="100%" height={250} />
                <div>
                  <Skeleton variant="text" width={100} />
                  <Skeleton variant="text" width={80} />
                </div>
              </div>
            ))
          ) : (
            boxingGear.map((gear) => (
              <ItemCard
                key={gear._id}
                item={gear}
                handleLike={handleLike}
                handleAddToCart={handleAddToCart}
                hoveredItems={hoveredItems}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                justAdded={justAddedItem === gear._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
