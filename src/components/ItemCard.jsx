import React from "react";

const ItemCard = ({
  item,
  handleLike,
  handleAddToCart,
  hoveredItems,
  handleMouseEnter,
  handleMouseLeave,
  justAdded,
}) => {
  return (
    <div
      className="bg-white border-black border px-[20px] py-[10px] flex flex-col justify-between gap-[10px] rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-[1.5rem] font-bold">{item.brand}</h3>
        <div className="text-[1.5rem] cursor-pointer" onClick={() => handleLike(item)}>
          {item.liked ? (
            <i className="text-redEasy fa-solid fa-heart"></i>
          ) : (
            <i className="hover:text-redEasy fa-regular fa-heart"></i>
          )}
        </div>
      </div>

      {item.img && <img src={item.img[0]} alt={item.brand} className="w-full h-auto" />}

      <div className="flex items-end justify-between">
        <div>
          {item.weight && <p className="text-gray-700">Weight: {item.weight} oz</p>}
          {item.size && <p className="text-gray-700">Size: {item.size}</p>}
          <p className="text-gray-700">Price: {item.price} €</p>
        </div>

        <div
          className="relative flex items-center justify-center cursor-pointer rounded-full p-[8px] hover:scale-[1.2] transition-all duration-300"
          onMouseEnter={() => handleMouseEnter(item._id)}
          onMouseLeave={() => handleMouseLeave(item._id)}
          onClick={(event) => {
            event.stopPropagation();  // Prevents the click from closing the cart
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
              <div className="flex items-center gap-[5px]">
                <i className="text-[#32e632] text-[1.3rem] fa-solid fa-circle-check"></i> Added
              </div>
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
