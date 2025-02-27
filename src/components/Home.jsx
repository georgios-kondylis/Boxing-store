import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import ItemCard from "./ItemCard";
import { main_px, transition } from "../utils";
import { useLocation, useSearchParams } from "react-router-dom";


const Home = ({ 
  boxingGear, setBoxingGear,
  setCartIsOpen, 
  setFavsIsOpen,
  handleAddToCart,
  setLikedItems, 
  handleLike, 
  justAddedItem,
}) => {

  const [loading, setLoading] = useState(true);
  const [hoveredItems, setHoveredItems] = useState({});
  const [categoryGloveHovered, setCategoryGloveHovered] = useState(false);
  const [categoryShoeHovered, setCategoryShoeHovered] = useState(false);
  const [categoryHeadgearHovered, setCategoryHeadgearHovered] = useState(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsCategory = searchParams.get("category");


  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await fetch("https://backend-boxingstore.onrender.com/allBoxingGear");
        const data = await response.json();
        const filteredGear = data.filter((item) => item.category === paramsCategory);
        const liked = data.filter((item) => item.liked === true);
        setBoxingGear(filteredGear);
        setLikedItems(liked);
        // console.log('render')
      } catch (error) {
        console.error("Error fetching gear:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGear();
  }, [paramsCategory]);

  const handleMouseEnter = (id) => {
    setHoveredItems((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoveredItems((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="w-full h-screen bg-[url(/boxingGym4.jpg)] bg-cover bg-center flex justify-center ">
      <div className={`min-h-screen flex flex-col w-full max-w-[1540px] overflow-x-hidden ${transition} ${main_px}`}
           onClick={() => {setCartIsOpen(false); setFavsIsOpen(false)}}>
        
        <div className={`relative text-[2rem] sm:text-[2.5rem] font-bold mb-6 mx-auto ${transition} `}>
          <h4>Welcome to Punch-Lab</h4>
          <img className="absolute pointer-events-none z-10 w-[70px] sm:top-[35px] top-[30px] right-[10px] sm:right-[20px]" src="/glovesOld2.png" alt="" />
        </div>


        {/*---------------  HOME --------------- */}
        {location.pathname === '/' && !location.search && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col md:flex-row w-full gap-[20px] items-center justify-around">
            <div className="min-w-[300px] w-[300px]">
              <img className="w-full" src="/goat.png" alt="" />
            </div>

            <div className="text-[1.2rem] lg:text-[1.4rem]  max-w-[600px] overflow-y-auto text-white rounded-[10px] p-[15px] bg-[#000000c0] font-semibold mt-[40px]">
              <p className="flex flex-col gap-[15px]">
                Step into the world of boxing like never before.
               <span> At Punch Lab, we bring you premium gear that combines unbeatable quality and unbeatable prices.</span>
               <span> Crafted with precision, designed for champions, and built to withstand every punch. </span>
                
                 Whether you're training for your next fight or pushing your limits, we’ve got your back.  
                Join us gear up, stay protected, and dominate the ring in style.
              </p>   
            </div>      
          </div>

          <div className="flex flex-col w-full gap-[20px] items-center justify-between">
            <div className="text-[2rem] md:text-[2.5rem] font-semibold mt-[40px]">
              <h4 className=""> {/* CSS */}
               Check Our Most Popular Categories
              </h4>   
            </div> 

            <div className="flex flex-wrap md:flex-nowrap w-full justify-around gap-[20px]">
              <div className="relative cursor-pointer min-w-[200px] w-[230px] hover:scale-110 transition-all duration-300 ease-in-out"
                   onClick={() => {setSearchParams('category=gloves'); setCartIsOpen(false); setFavsIsOpen(false)}}
                   onMouseEnter={() => setCategoryGloveHovered(true)}
                   onMouseLeave={() => setCategoryGloveHovered(false)}>
                    
                <img className="w-full" src="/hitNmoveRed.png" alt="" />
                {categoryGloveHovered && 
                <div>
                   <p className={`absolute z-10 ${transition} hover:scale-105 bg-paperBg px-[7px] rounded-md bottom-[20%] left-1/2 transform -translate-x-1/2`}> Visit Gloves Category </p> 
                   <div className="absolute left-1/2 transform -translate-x-1/2 w-[30px] h-[30px] rotate-45 bottom-[29%] bg-paperBg"></div>
                </div>}
              </div>
              <div className="relative cursor-pointer min-w-[200px] w-[300px] hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => {setSearchParams('category=shoes'); setCartIsOpen(false); setFavsIsOpen(false)}}
                  onMouseEnter={() => setCategoryShoeHovered(true)}
                  onMouseLeave={() => setCategoryShoeHovered(false)}>
                    
                <img className="w-full" src="/venumShoe.png" alt="" />
                {categoryShoeHovered &&
                <div>
                   <p className={`absolute z-10 ${transition} hover:scale-105 bg-paperBg px-[7px] rounded-md bottom-[20%] left-1/2 transform -translate-x-1/2`}> Visit Shoes Category </p> 
                   <div className="absolute left-1/2 transform -translate-x-1/2 w-[30px] h-[30px] rotate-45 bottom-[29%] bg-paperBg"></div>
                </div>}
              </div>
              <div className="relative cursor-pointer min-w-[200px] w-[250px] hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() => {setSearchParams('category=headgear'); setCartIsOpen(false); setFavsIsOpen(false)}}
                  onMouseEnter={() => setCategoryHeadgearHovered(true)}
                  onMouseLeave={() => setCategoryHeadgearHovered(false)}>
                    
                <img className="w-full" src="/adidas.png" alt="" />
                {categoryHeadgearHovered && 
               <div>
                  <p className={`absolute z-10 ${transition} hover:scale-105 bg-paperBg px-[7px] rounded-md bottom-[20%] left-1/2 transform -translate-x-1/2`}> Visit Headgear Category </p> 
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-[30px] h-[30px] rotate-45 bottom-[29%] bg-paperBg"></div>
                </div>
                }
              </div>
            </div>
            
          </div>

        </div>
        
         )}


        {/* ----------------------  ITEMS DISPLAY ---------------------- */}
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
