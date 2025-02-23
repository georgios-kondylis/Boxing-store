import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { main_px, transition } from "../utils";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ 
  boxingGear, setBoxingGear,
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
  const [showTemporaryHeart, setShowTemporaryHeart] = useState(false); // for Like anim
  const [hoveredCart, setHoveredCart] = useState(false); // CART anim

  const handleLikeClick = (event) => {
    event.stopPropagation();
    
    const updatedProduct = { ...product, liked: !product.liked };  // Toggle the 'liked' property of the product
    setProduct(updatedProduct);   // Update the product state with the new liked value
    handleLike(updatedProduct);   // Call the handleLike function to update the objects liked property for real 
    setShowTemporaryHeart(true);  // Show the selected heart temporarily

    setTimeout(() => {
      setShowTemporaryHeart(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/allBoxingGear/${id}`);
        const formatJson = await response.json();
        setProduct(formatJson);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={`w-full text-white bg-mainBg min-h-screen md:gap-[50px] flex flex-col md:flex-row justify-start items-center md:items-start pt-[100px] ${main_px} ${transition}`}
         onClick={() => {setCartIsOpen(false); setFavsIsOpen(false);}}>
      <div id="img_container" className="w-[90%] sm:w-[50%] sm:max-w-[400px]">
        <img src={product.img[0]} alt={product.name} className="w-[100%] my-[10px]" />
      </div>

      <div className="flex flex-col px-[10px] md:px-[0px] w-full md:w-[50%] justify-between min-h-[250px]">
         <h1 className="text-[3rem] font-bold">{product.brand}</h1>
         <p className="text-lg">{product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia velit rerum cupiditate debitis veritatis nihil quo voluptates, facere unde aut at obcaecati doloribus enim architecto nisi non alias neque corrupti? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur quod minima distinctio rerum repudiandae atque, quo dicta quis delectus quia, voluptatum mollitia fuga eaque nemo! Quidem, fugit dicta? Ipsa, quae?</p>

         <div className="flex flex-col gap-[10px]">
          <p className="text-[2rem] font-semibold mt-4">{product.price} €</p>
          <div id="CART_&_LIKE" className={`flex gap-[30px] justify-between text-[1.8rem]`}>
              <div className={`flex ${hoveredCart ? 'bg-mainBeige text-black' : 'bg-boxBlack'} cursor-pointer rounded-md px-[10px] w-full items-center gap-[20px]`}
                  onMouseEnter={() => setHoveredCart(true)}
                  onMouseLeave={() => setHoveredCart(false)}
                  onClick={(event) => {
                    event.stopPropagation(); // Prevents the click from closing the cart
                    handleAddToCart(product);
                  }} >
                <p>Add to cart</p>
                {hoveredCart ? 
                  <i className={`${hoveredCart ? 'scale-[1.2]' : ''} ${transition} text-[1.4rem] fa-solid fa-cart-plus`} /> : 
                  <i className="text-[1.4rem] fa-solid fa-cart-shopping" />
                }
              </div>
              <div className="px-[10px] bg-mainBeige rounded-md cursor-pointer text-redEasy" onClick={handleLikeClick}
                  onMouseEnter={() => setHoveredHeart(true)}
                  onMouseLeave={() => setHoveredHeart(false)}>
                {product.liked ? 
                  showTemporaryHeart? <i className="fa-solid fa-heart-circle-check"></i> :
                  <i className="fa-solid fa-heart" /> : 
                  <i className="text-black hover:text-redEasy fa-regular fa-heart" />
                }
              </div>
          </div>
         </div>
      </div>
    </div>
  );
};

export default ProductDetails;
