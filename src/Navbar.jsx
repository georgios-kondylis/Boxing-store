import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { main_px_navbar, transition } from './utils';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ 
  cartIsOpen, setCartIsOpen,
  favsIsOpen , setFavsIsOpen,
  cartItems, setCartItems, 
  fetchCartData, cartLength, 
  likedItems,
  handleLike, handleAddToCart,
  justAddedItem, setJustAddedItem}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || ""; // Get current category from URL to dispaly as the option label
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const [navHovereditems, setNavHoveredItems] = useState({});
  const [homeHovered, setHomeHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartData();
  }, []); 

  const handleDelete = async (id) => {
    try {
      await fetch(`https://backend-boxingstore.onrender.com/add-to-cart/${id}`, { method: 'DELETE' });
      fetchCartData(); // Fetch updated cart after deleting an item
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleCategoryChange = (event) => {
   const selectedCatecory = event.target.value;
   setSearchParams({category: selectedCatecory});
  }

  const handleMouseEnter = (id) => {
    setNavHoveredItems((prev) => ({...prev, [id]: true}));
  }
  const handleMouseLeave = (id) => {
    setNavHoveredItems((prev) => ({...prev, [id]: false}));
  }


  return (
    <>
      <div id='navbar-container' className={`fixed z-50 text-white w-full bg-boxBlack border-b flex justify-center`}>

        <div id='navbar' className={`${main_px_navbar} ${transition} max-w-[1540px] shadow-xl w-full items-center flex justify-between h-[70px]`}>
          <div className='flex relative items-center gap-[20px]'>

            <div className={`text-[1.3rem] md:text-[1.5rem] hover:scale-[1.2] cursor-pointer ${transition}`}
                 onClick={() =>{navigate('/'); setCartIsOpen(false); setFavsIsOpen(false); }}
                 onMouseEnter={()=> setHomeHovered(true)}
                 onMouseLeave={()=> setHomeHovered(false)}>
             <i className="fa-solid fa-house"></i>
            </div>

            {!location.pathname.startsWith('/product/') && (
            <div id='Form_And_Hamburger'>
              <FormControl sx={{ width: '120px', '& .MuiOutlinedInput-root': 
                  {'&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white', } , },// Change focus border color
                   '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#fff', } , // Change hover border color
                   '.MuiOutlinedInput-notchedOutline': {  borderColor: 'gray',}, // default border color
                    '& .MuiInputLabel-root': { color: 'white', bgcolor: 'boxBlack', paddingRight: '5px'}, // anim label color
                    '& .MuiInputLabel-root.Mui-focused': { color: 'white', }, // hover label color when focused 
                    '& .MuiSvgIcon-root': { color: 'white'}, // Change arrow icon color
                    }}>
                  <InputLabel id="Category">Category</InputLabel>
                  <Select labelId="category-select-label" id="category-select" value={category} label="Category"
                    onChange={handleCategoryChange} // Updates search params
                    MenuProps={{  PaperProps: {
                      sx: {
                        backgroundColor: '#333', // Dropdown background color
                        color: 'white', // Text color inside dropdown
                        '& .MuiMenuItem-root': { 
                          '&:hover': { backgroundColor: '#fffbf0', color: 'black' }, // Hover background color → Red
                          '&.Mui-selected': { backgroundColor: '#121212' }, // Selected background color → Orange
                          '&.Mui-selected:hover': { backgroundColor: '#fff' } // Darker orange on hover if selected
                        }
                      }
                    }
                  }} 
                  sx={{ '& .MuiSelect-select': { color: '#fff' } }} // Color of selected item
                  >
                    <MenuItem value="gloves" >Gloves</MenuItem>
                    <MenuItem value="wraps">Wraps</MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="headgear">Headgear</MenuItem>
                    <MenuItem value="mouthpiece">Mouthpiece</MenuItem>
                  </Select>
              </FormControl>
            </div>
            )}
           </div>

          <div className='absolute left-[49%] items-center'>
            <img className='w-[70px]' src="/punchlab.png" alt="" />
          </div>
          

          <div id='Cart-&-Heart' className='text-[1.4rem] pr-[10px] flex items-center gap-[20px]'>
                     {/* HEART-ICON */}
            <div className='relative cursor-pointer' onClick={() => setFavsIsOpen(true)}>
               <i className={`text-[1.3rem] md:text-[1.5rem] hover:scale-[1.2] cursor-pointer ${transition} fa-solid fa-heart-circle-check`}></i>
               <div className={`absolute ${likedItems < 1 ? 'hidden' : ''} top-[-4px] right-[-10px] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#dc3030]`}>
                <p className='text-[13px]'>{likedItems.length}</p>
              </div>
            </div>

            <div className='relative cursor-pointer' onClick={() => setCartIsOpen(true)}>
              <i className={`text-[1.3rem] md:text-[1.5rem] hover:scale-[1.2] cursor-pointer ${transition} fa-solid fa-cart-shopping`}></i>
              <div className={`absolute ${cartLength < 1 ? 'hidden' : ''} top-[-5px] right-[-10px] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#dc3030]`}>
                <p className='text-[13px]'>{cartLength}</p>
              </div>
            </div>
          </div>

          {/* Favs-Section */}
          <div className={`z-50 fixed ${favsIsOpen? 'right-0' : 'right-[-900px]'} top-0 h-full w-[250px] md:w-[300px] bg-boxBlack p-[20px] shadow-lg ${transition}`}>
            <div>
              <button className='text-[1.5rem] ml-[20px]' onClick={() => setFavsIsOpen(false)}>
                  <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
             {likedItems.map((item) => (
            <div key={item._id} className='flex gap-[20px] py-[10px] justify-between items-center border-b'>
              <img className='xs:w-[40px] w-[60px] md:w-[80px] lg:w-[110px]' src={item.img} alt="" />
              <div className='flex flex-col text-[1rem] text-white'>
                <p className=''> {item.brand}</p>
                <p className=''> {item.price} € </p>
              </div>
              
              <div className='flex flex-col gap-[5px] text-[1.7rem]'>
                <div className='relative cursor-pointer' onClick={() => handleLike(item)}>
                  <i className="text-redEasy fa-solid fa-heart"></i>
                  <i className={`absolute hover:scale-[1.3] top-[9px] left-[8px] py-[7px] px-[6px] text-[0.9rem] fa-solid fa-circle-xmark ${transition}`}></i>
                </div>
                <div className='relative cursor-pointer' 
                     onClick={()=> handleAddToCart(item)}
                     onMouseEnter={() => handleMouseEnter(item._id)}
                     onMouseLeave={() => handleMouseLeave(item._id)}>
                   <i className={`hover:scale-[1.1] hover:text-[#c8c8c8] fa-solid fa-cart-plus ${transition}`}></i>
                   {navHovereditems[item._id] && justAddedItem ? <i className="absolute text-[#59ed59] pointer-events-none top-[0px] text-[1.1rem] right-[-10px] fa-solid fa-circle-check"></i> : ''}
                </div>
                
              </div>
            </div>
             ))}
          </div>

          {/* Side Cart Panel */}
          <div id='sidenav' className={`z-50 fixed bg-boxBlack top-0 overflow-y-auto h-full w-[50%] md:w-[45%] max-w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} ${transition}`}>
            <div className='border-b w-full h-[70px] flex justify-start items-center'>
              <button className='text-[1.5rem] ml-[20px]' onClick={() => setCartIsOpen(false)}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>

            <div className='flex flex-col justify-between h-[85vh]'>

              <div id='cart-items-container' className='mt-[10px] pb-[60px] flex flex-col gap-[10px] px-4'>
                {cartItems.length > 0 ?
                  cartItems.map((item) => (
                    <div key={item._id} className='flex justify-between items-center py-[10px] border-b'>
                      <div className='flex items-center gap-4'>
                        <img src={item.img[0]} className='object-contain xs:w-[40px] w-[60px] md:w-[80px] h-[70px]' alt='No image' />
                        <div className='flex flex-col'>
                          <p>{item.brand}</p>
                          <p>{item.price} €</p>
                        </div>
                      </div>

                      <button className={`rounded-full hover:scale-110 hover:text-redEasy ${transition} text-xl`}
                              onClick={() => handleDelete(item._id)}>
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))
                  : <p className='mx-auto'>Your Cart is empty</p>}
              </div>

              {/* Total Amount Section */}
              <div className="z-10 fixed bottom-0 bg-mainBg w-full p-[10px] border-t flex justify-between xs:text-[0.8rem] text-[1rem]">
                <p>Total Amount: {totalAmount.toFixed(2)} €</p>
              </div>

            </div>

          </div>
          
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
