import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';

const Gloves = ({ setCartIsOpen }) => {
  const [gloves, setGloves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGloves, setHoveredGloves] = useState({});
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const fetchGloves = async () => {
      try {
        const response = await fetch("http://localhost:5000/boxing_gloves");
        const data = await response.json();
        setGloves(data);
        setLoading(false); // ✅ Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching gloves:", error);
        setLoading(false); // ✅ Also set loading false on error
      }
    };

    fetchGloves();
  }, []);

  const handleAddToCart = async (glove) => {
    try {
      const response = await fetch("http://localhost:5000/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: glove.brand,
          weight: glove.weight,
          price: glove.price,
          img: glove.img[0],
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Item added to cart:", result.cartItem);
      } else {
        console.error("Failed to add to cart:", result.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleLike = async (glove) => {
    try {
      const updatedLikedStatus = !glove.liked; // Toggle liked status locally

      // Optimistically update the UI
      setGloves((prevGloves) =>
        prevGloves.map((item) =>
          item._id === glove._id ? { ...item, liked: updatedLikedStatus } : item
        )
      );

      // Send the updated liked status to the server
      const response = await fetch("http://localhost:5000/boxing_gloves", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: glove._id, // Send the _id of the glove to ensure correct identification
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Glove liked status updated:", result.glove);
      } else {
        console.error("Failed to update like status:", result.error);
      }
    } catch (error) {
      console.error("Error toggling like status:", error);
    }
  };

  const handleMouseEnter = (id) => {
    setHoveredGloves((prevState) => ({ ...prevState, [id]: true }));
  };
  
  const handleMouseLeave = (id) => {
    setHoveredGloves((prevState) => ({ ...prevState, [id]: false }));
  };

  return (
    <div className="p-6 flex flex-col bg-mainBg" onClick={() => setCartIsOpen(false)}>
      <h1 className="text-3xl font-semibold mb-6 mx-auto text-white">
        Boxing Gloves
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? ( // Skeleton loader
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
          gloves.map((glove) => ( // ✅ items render
            <div
              key={glove._id}
              className="bg-white border-black border px-[20px] py-[10px] flex flex-col justify-between gap-[10px] rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-[1.5rem] font-bold">
                  {glove.brand}
                </h3>
                <div className="text-[1.5rem] cursor-pointer" onClick={() => handleLike(glove)}>
                  {glove.liked ? (
                    <i className="text-redEasy fa-solid fa-heart"></i>
                  ) : (
                    <i className="hover:text-redEasy fa-regular fa-heart"></i>
                  )}
                </div>
              </div>

              {glove.img && <img src={glove.img[0]} alt={glove.brand} className="w-full h-auto" />}

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-700">Weight: {glove.weight} oz</p>
                  <p className="text-gray-700">Price: {glove.price} €</p>
                </div>

                <div
                  className="relative flex items-center justify-center cursor-pointer rounded-full p-[8px] hover:scale-[1.2] transition-all duration-300"
                  onMouseEnter={() => handleMouseEnter(glove._id)}
                  onMouseLeave={() => handleMouseLeave(glove._id)}
                  onClick={() => {
                    handleAddToCart(glove);
                    setJustAdded(true); // Set true when item is added to cart
                    setTimeout(() => {
                      setJustAdded(false); 
                    }, 700);
                  }}
                >
                  <i className="text-[1.4rem] fa-solid fa-cart-plus"></i>
                  <p
                    className={`absolute text-[0.8rem] ${
                      !hoveredGloves[glove._id] ? "opacity-0 pointer-events-none left-0" : "left-[-70px]"
                    } text-nowrap transition-all duration-300`}
                  >
                    {justAdded ? (
                      <div className="flex items-center gap-[5px]">
                        <i className="text-[#32e632] text-[1.3rem] fa-solid fa-circle-check"></i> Added
                      </div> ) : ( 'Add to Cart' )}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Gloves;
