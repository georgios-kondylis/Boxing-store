import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { transition } from "../utils";

const ItemCard = ({
  item,
  handleLike,
  handleAddToCart,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
  justAdded,
}) => {
  const [selectedSize, setSelectedSize] = useState(null); // State to track selected size for shoes only
  const [showTemporaryHeart, setShowTemporaryHeart] = useState(false); // for Like
  const navigate = useNavigate();

  const handleSizeClick = (size) => { // Only for Shoes
    setSelectedSize((prevSelectedSize) => 
      prevSelectedSize === size ? null : size // Toggle logic
    );
  };

  const handleLikeClick = (event) => {
    event.stopPropagation();
    handleLike(item);

    setShowTemporaryHeart(true);  // Show the selected heart temporarily

    setTimeout(() => {
      setShowTemporaryHeart(false);
    }, 1000);
  };


  return (
    <div
      className={`bg-white border-black border px-[20px] py-[10px] flex flex-col justify-between gap-[10px] rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] ${transition}`}>

      <div className="flex justify-between items-center">
        <h3 className="text-[1.5rem] font-bold">{item.brand}</h3>
        <div className="text-[1.5rem] cursor-pointer" 
             onClick={handleLikeClick}>
          {item.liked ? (
            showTemporaryHeart? <i className=" text-redEasy fa-solid fa-heart-circle-check"></i> :
            <i className="text-redEasy fa-solid fa-heart"></i>
          ) : (
            <i className="hover:text-redEasy fa-regular fa-heart"></i>
          )}
        </div>
      </div>

      {item.img &&
      <img src={item.img[0]} alt={item.brand} className={`hover:scale-[1.1] cursor-pointer w-full h-auto ${transition}`}
           onClick={ () => navigate(`/product/${item._id}`) }/>}

      <div className="flex items-end justify-between">
        <div>
          {item.weight > 0 && <p className="text-gray-700">Weight: {item.weight} oz</p>}
          {item.sizes.length > 1 && (
            <div className="flex items-center gap-[5px]">
              Size:
              <div className="flex gap-[5px] rounded-full max-w-[150px] text-gray-700">
                {item.sizes.map((size, i) => (
                  <p key={i} className={`border rounded-full px-[2px] text-[13px] hover:scale-125 cursor-pointer ${transition} 
                    ${selectedSize === size ? "scale-[1.2] bg-mainBg text-white" : "border-[#262626ad] text-[13px]" }`}
                    onClick={() => handleSizeClick(size)} // Handle size selection
                  >
                    {size}
                  </p>
                ))}
              </div>
            </div>
          )}
          <p className="text-gray-700">Price: {item.price} €</p>
        </div>

        <div
          className={`relative flex items-center justify-center cursor-pointer rounded-full p-[8px] hover:scale-[1.2] ${transition} `}
          onMouseEnter={() => handleMouseEnter(item._id)}
          onMouseLeave={() => handleMouseLeave(item._id)}
          onClick={(event) => {
            event.stopPropagation(); // Prevents the click from closing the cart
            handleAddToCart(item);
          }}
        >
          <i className="text-[1.4rem] fa-solid fa-cart-plus"></i>
          <p
            className={`absolute text-[0.8rem] ${
              !hoveredItems[item._id] ? "opacity-0 pointer-events-none left-0" : "left-[-70px]"
            } text-nowrap transition-all duration-300`}
          >
            {justAdded ? (
              <span className="flex items-center gap-[5px]">
                <i className="text-[#32e632] text-[1.3rem] fa-solid fa-circle-check"></i> Added
              </span>
            ) : (
              "Add to Cart"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
