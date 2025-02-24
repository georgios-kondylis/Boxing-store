import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import ItemCard from "./ItemCard";
import { main_px, transition } from "../utils";
import { useSearchParams } from "react-router-dom";


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

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsCategory = searchParams.get("category");


  useEffect(() => {
    const fetchGear = async () => {
      try {
        const response = await fetch("http://localhost:5000/allBoxingGear");
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
    <div className="w-full h-screen bg-[url(/boxingGym2.jpg)] bg-cover bg-center flex justify-center ">
      <div className={`min-h-screen flex flex-col w-full max-w-[1540px] overflow-x-hidden ${transition} ${main_px}`}
           onClick={() => {setCartIsOpen(false); setFavsIsOpen(false)}}>

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
