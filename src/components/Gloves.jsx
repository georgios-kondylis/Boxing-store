import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import ItemCard from "./ItemCard";
import { main_px, transition } from "../utils";


const Gloves = ({ setCartIsOpen, cartIsOpen }) => {
  const [gloves, setGloves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItems, setHoveredItems] = useState({});
  const [justAddedItem, setJustAddedItem] = useState(null);


  useEffect(() => {
    const fetchGloves = async () => {
      try {
        const response = await fetch("http://localhost:5000/boxing_gloves");
        const data = await response.json();
        setGloves(data);
      } catch (error) {
        console.error("Error fetching gloves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGloves();
  }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: item.brand,
          weight: item.weight,
          price: item.price,
          img: item.img[0],
        }),
      });

      const result = await response.json();
      if (response.ok) {
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
      const updatedLikedStatus = !item.liked;

      setGloves((prevGloves) =>
        prevGloves.map((glove) =>
          glove._id === item._id ? { ...glove, liked: updatedLikedStatus } : glove
        )
      );

      const response = await fetch("http://localhost:5000/boxing_gloves", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: item._id }),
      });

      const result = await response.json();
      if (!response.ok) console.error("Failed to update like status:", result.error);
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
        <h1 className="text-3xl font-semibold mb-6 mx-auto text-white">Boxing Gloves</h1>

        <div className="grid xs:grid-cols-1 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
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
            gloves.map((glove) => (
              <ItemCard
                key={glove._id}
                item={glove}
                handleLike={handleLike}
                handleAddToCart={handleAddToCart}
                hoveredItems={hoveredItems}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                justAdded={justAddedItem === glove._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gloves;
