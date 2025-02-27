import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { main_px, transition } from "../utils";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ProductDetails = ({ 
  setCartIsOpen, 
  setFavsIsOpen,
  handleAddToCart,
  setLikedItems, 
  handleLike, 
  justAddedItem,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredHeart, setHoveredHeart] = useState(false);
  const [showTemporaryHeart, setShowTemporaryHeart] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);

  const handleLikeClick = (event) => {
    event.stopPropagation();
    const updatedProduct = { ...product, liked: !product.liked };
    setProduct(updatedProduct);
    handleLike(updatedProduct);
    setShowTemporaryHeart(true);

    setTimeout(() => {
      setShowTemporaryHeart(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://backend-boxingstore.onrender.com/allBoxingGear/${id}`);
        const formatJson = await response.json();
        setProduct(formatJson);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  return (
    <div className="relative flex justify-center bg-[url(/bgym.jpg)] bg-cover bg-center">
  
      <div 
        className={`flex flex-col w-full md:flex-row justify-start items-center md:items-start gap-[20px] max-w-[1540px] text-white min-h-screen md:gap-[40px] pt-[100px]
           ${transition} ${main_px}`}
        onClick={() => { setCartIsOpen(false); setFavsIsOpen(false); }}>

        <button
          className={`fixed z-50 flex py-[5px] px-[9px] hover:scale-105 hover:shadow-[5px_10px_10px_1px_#1212124f] bg-boxBlack rounded-md items-center gap-[10px] top-[18px] left-[25%] sm:left-[15%] ${transition}`}
          onClick={() => navigate(-1)} >
          <i class="fa-solid fa-arrow-left"></i>
          GO BACK
        </button>
        
        {/* === Skeleton Loader (Loading State) === */}
        {loading ? (
          <div className="flex flex-col md:flex-row w-full items-center md:items-start gap-[50px] px-[20px]">
      
          {/* Image Skeleton */}
          <div className="bg-paperBg rounded-lg p-[10px] w-[90%] md:w-[50%] sm:max-w-[400px]">
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={400} 
              animation="wave" 
              sx={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }} 
            />
          </div>
      
          {/* Text & Buttons Skeleton */}
          <div className="flex flex-col bg-paperBg text-black rounded-lg p-[10px] w-full md:w-[50%] justify-between min-h-[350px]">
            
            {/* Title */}
            <Skeleton variant="text" width="80%" height={50} animation="wave" />
      
            {/* Description */}
            <div>
              <Skeleton variant="text" width="100%" height={20} animation="wave" />
              <Skeleton variant="text" width="100%" height={20} animation="wave" />
              <Skeleton variant="text" width="90%" height={20} animation="wave" />
              <Skeleton variant="text" width="80%" height={20} animation="wave" />
              <Skeleton variant="text" width="90%" height={20} animation="wave" />
            </div>
          
            {/* Price & Buttons */}
            <div className="flex flex-col gap-[0px]">
              <Skeleton variant="text" width={100} height={40} animation="wave" />
              <div className="flex justify-between items-center w-full">
                <Skeleton variant="text" width='65%' height={80} animation="wave" />
                <Skeleton variant="text" width='25%' height={80} animation="wave" />
              </div>
            </div>
      
          </div>
        </div>
        ) : (
          /* === Actual Content When Loaded === */
          <>
            <div id="img_container" className="bg-paperBg rounded-lg p-[10px] w-[90%] sm:w-[50%] sm:max-w-[400px]">
              <img src={product.img[0]} alt={product.name} className="w-[100%] my-[10px]" />
            </div>

            <div className="flex bg-paperBg text-black rounded-lg flex-col p-[10px] w-full md:w-[50%] justify-between min-h-[250px]">
              <h1 className="text-[3rem] font-bold">{product.brand}</h1>
              <p className="text-lg">{product.description}</p>

              <div className="flex flex-col gap-[10px]">
                <p className="text-[2rem] font-semibold mt-4">{product.price} €</p>
                
                <div id="CART_&_LIKE" className="flex text-white gap-[30px] justify-between text-[1.8rem]">
                  {/* Add to Cart Button */}
                  <div className={`flex ${hoveredCart ? 'bg-boxBlack' : 'bg-mainBg'} cursor-pointer rounded-md px-[10px] w-full items-center gap-[20px]`}
                      onMouseEnter={() => setHoveredCart(true)}
                      onMouseLeave={() => setHoveredCart(false)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleAddToCart(product);
                      }}>
                    {justAddedItem ? (
                      <div className="flex items-center gap-[20px]">
                        <p>Added to cart</p>
                        <i className="text-[#32e632] text-[1.3rem] fa-solid fa-circle-check"></i>
                      </div>
                    ) : (
                      <div className="flex items-center gap-[20px]">
                        <p>Add to cart</p>
                        {hoveredCart ? 
                          <i className="scale-[1.2] transition text-[1.4rem] fa-solid fa-cart-plus" /> : 
                          <i className="text-[1.4rem] fa-solid fa-cart-shopping" />
                        }
                      </div>
                    )}
                  </div>

                  {/* Like Button */}
                  <div className="px-[10px] bg-mainBg rounded-md cursor-pointer text-redEasy"
                      onClick={handleLikeClick}
                      onMouseEnter={() => setHoveredHeart(true)}
                      onMouseLeave={() => setHoveredHeart(false)}>
                    {product.liked ? 
                      (showTemporaryHeart ? <i className="fa-solid fa-heart-circle-check"></i> :
                      <i className="fa-solid fa-heart" />) : 
                      <i className="text-white hover:text-redEasy fa-regular fa-heart" />
                    }
                  </div>
                </div>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
