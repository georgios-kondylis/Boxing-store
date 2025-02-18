import React, { useEffect, useState } from "react";

const Gloves = () => {
  const [gloves, setGloves] = useState([]);  // State to hold the fetched gloves data

  // Fetch gloves data from the API when the component mounts
  useEffect(() => {
    const fetchGloves = async () => {
      try {
        const response = await fetch("http://localhost:5000/boxing_gloves"); // Use the correct URL based on your server setup
        const data = await response.json();
        setGloves(data);
      } catch (error) {
        console.error("Error fetching gloves:", error);
      }
    };

    fetchGloves();
  }, []);

  const handleAddToCart = async (glove) => {
    try {
      const response = await fetch("http://localhost:5000/add-to-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          brand: glove.brand, 
          weight: glove.weight,
          price: glove.price, 
          img: glove.img[0]
        }),
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Item added to cart:", result.cartItem);
        // Optionally update the UI or show a success message here
      } else {
        console.error("Failed to add to cart:", result.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleClick = (glove) => {
    handleAddToCart(glove); // Call the function to add item to the cart when clicked
  };

  // State to track hover for each glove (using glove._id as key)
  const [hoveredGloves, setHoveredGloves] = useState({});

  const handleMouseEnter = (id) => {
    setHoveredGloves(prevState => ({
      ...prevState,
      [id]: true, // Set the hover state of the specific glove to true
    }));
  };

  const handleMouseLeave = (id) => {
    setHoveredGloves(prevState => ({
      ...prevState,
      [id]: false, // Set the hover state of the specific glove to false
    }));
  };

  return (
    <div className="p-6 flex flex-col bg-mainBg">
      <h1 className="text-3xl font-semibold mb-6 mx-auto text-white">
        Boxing Gloves
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gloves.length > 0 ? (
          gloves.map((glove) => (
            <div key={glove._id}
              className="bg-white border-black border px-[20px] py-[10px] flex flex-col justify-between gap-[10px] rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-center mb-3">
                {glove.brand}
              </h3>

              {glove.img && <img src={glove.img[0]} alt={glove.brand} />}

              <div className="flex items-end justify-between">
                <div id="oz-price-container">
                  <p className="text-gray-700">Weight: {glove.weight} oz</p>
                  <p className="text-gray-700">Price: ${glove.price}</p>
                </div>

                <div id="cartIcon-container" className=" hover:shadow-[2px_2px_10px_rgba(0,0,0,0.5)] relative flex items-center justify-center cursor-pointer rounded-full p-[8px] hover:scale-[1.2] transition-all duration-300"
                  onMouseEnter={() => handleMouseEnter(glove._id)} // Pass glove._id to track which glove is hovered
                  onMouseLeave={() => handleMouseLeave(glove._id)} // Pass glove._id to stop hover for the correct glove
                  onClick={() => handleClick(glove)} // Trigger handleClick when clicked
                >
                  <i className="text-[1.3rem] fa-solid fa-cart-shopping"></i>
                  <p
                    className={`absolute text-[0.8rem] ${
                      !hoveredGloves[glove._id] ? "opacity-0 pointer-events-none left-0" : "left-[-70px]"
                    } text-nowrap transition-tranlate duration-300`}
                  >
                    Add to cart
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">Loading gloves...</p>
        )}
      </div>
    </div>
  );
};

export default Gloves;
