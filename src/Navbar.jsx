import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useSearchParams } from 'react-router-dom';
import { main_px_navbar, transition } from './utils';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const Navbar = ({ 
  cartIsOpen, setCartIsOpen,
  favsIsOpen , setFavsIsOpen,
  cartItems, setCartItems, 
  fetchCartData, cartLength, 
  likedItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || ""; // Get current category from URL to dispaly as the option label
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    fetchCartData();
  }, []); 

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/add-to-cart/${id}`, { method: 'DELETE' });
      fetchCartData(); // Fetch updated cart after deleting an item
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleCategoryChange = (event) => {
   const selectedCatecory = event.target.value;
   setSearchParams({category: selectedCatecory});
  }


  return (
    <>
      <div id='navbar-container' className='fixed z-50 text-white w-full bg-mainBg2 border-b flex justify-center'>

        <div id='navbar' className={`${main_px_navbar} ${transition} max-w-[1540px] shadow-xl w-full items-center flex justify-between h-[70px]`}>
          <div id='Logo_&_Select' className='flex items-center gap-[20px]'>
            <div className='flex items-center'>
              <img className='w-[70px]' src="/logoBox.png" alt="" />
              <h1>Gamias</h1>
            </div>
              <FormControl sx={{ width: '200px', '& .MuiOutlinedInput-root': 
                  {'&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white', } , },  // Change focus border color
                  '.MuiOutlinedInput-notchedOutline': {  borderColor: 'gray',}, // default border color
                    '&:hover .MuiOutlinedInput-notchedOutline': {  borderColor: '#fff',}, //  border color on hover
                    '& .MuiInputLabel-root': { color: 'white', bgcolor: '#606060', paddingRight: '5px'}, // anim label color
                    '& .MuiInputLabel-root.Mui-focused': { color: 'white', }, // hover label color when focused 
                    '& .MuiSvgIcon-root': { color: 'white'}, // Change arrow icon color
                    }}>
                  <InputLabel id="Category">Category</InputLabel>
                  <Select labelId="category-select-label" id="category-select" value={category} label="Category"
                    onChange={handleCategoryChange} // Updates search params
                    MenuProps={{ PaperProps: {sx: {
                          backgroundColor: '#333', // Dropdown background color
                          color: 'white',}} // Text color inside dropdown
                     }} sx={{  '& .MuiSelect-select': { color: '#fff',}}} // Color of selected item  
                  >
                    <MenuItem value="gloves" >Gloves</MenuItem>
                    <MenuItem value="wraps">Wraps</MenuItem>
                    <MenuItem value="shoes">Shoes</MenuItem>
                    <MenuItem value="headgear">Headgear</MenuItem>
                    <MenuItem value="mouthpiece">Mouthpiece</MenuItem>
                  </Select>
              </FormControl>
          </div> 

          <div id='Cart-&-Heart' className='text-[1.4rem] flex items-center gap-[20px]'>
            <div className='relative cursor-pointer' onClick={() => setCartIsOpen(true)}>
              <i className="text-[1.4rem] fa-solid fa-cart-shopping"></i>
              <div className={`absolute ${cartLength < 1 ? 'hidden' : ''} top-[-5px] right-[-10px] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#dc3030]`}>
                <p className='text-[13px]'>{cartLength}</p>
              </div>
            </div>
                     {/* HEART-ICON */}
            <div className='relative cursor-pointer' onClick={() => setFavsIsOpen(true)}>
               <i className="fa-solid fa-heart-circle-check"></i>
               <div className={`absolute ${likedItems < 1 ? 'hidden' : ''} top-[-4px] right-[-10px] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#dc3030]`}>
                <p className='text-[13px]'>{likedItems.length}</p>
              </div>
            </div>
          </div>

          {/* Favs-Section */}
          <div className={`fixed ${favsIsOpen? 'right-0' : 'right-[-900px]'} top-0 h-full w-[400px] bg-mainBg p-[20px] shadow-lg ${transition}`}>
            <div>
              <button className='text-[1.5rem] ml-[20px]' onClick={() => setFavsIsOpen(false)}>
                  <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
             {likedItems.map((item) => (
            <div key={item._id} className='flex gap-[20px] items-center border-b'>
              <img className='w-[80px]' src={item.img} alt="" />
              <div className='flex flex-col'>
                <p className=' text-[1rem] text-white'> {item.brand}</p>
                <p className=' text-[1rem] text-white'> {item.price} € </p>
              </div>
              
              <div className='flex flex-col gap-[15px] text-[1.3rem]'>
                <div className='relative'>
                  <i className="text-redEasy fa-solid fa-heart"></i>
                  <i class={`absolute hover:scale-[1.3] top-[5px] left-[5px] py-[7px] px-[6px] text-[0.7rem] fa-solid fa-circle-xmark ${transition}`}></i>
                </div>
                 <i class="fa-solid fa-cart-plus"></i>
              </div>
            </div>
             ))}
          </div>

          {/* Side Cart Panel */}
          <div id='sidenav' className={`z-50 fixed bg-[#2e2e2e] top-0 overflow-y-auto h-full w-[45%] max-w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} ${transition}`}>
            <div className='border-b w-full h-[70px] flex justify-start items-center'>
              <button className='text-[1.5rem] ml-[20px]' onClick={() => setCartIsOpen(false)}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>

            <div className='flex flex-col justify-between h-[85vh]'>

              <div id='cart-items-container' className='mt-[10px] pb-[60px] flex flex-col gap-[10px] px-4'>
                {cartItems.length > 0 ?
                  cartItems.map((item) => (
                    <div key={item._id} className='flex justify-between items-center p-2 border-b'>
                      <div className='flex items-center gap-4'>
                        <img src={item.img[0]} className='object-contain w-[70px] h-[70px]' alt='No image' />
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
              <div className="z-10 fixed bottom-0 bg-mainBg w-full p-4 border-t flex justify-between text-lg">
                <p>Total Amount: {totalAmount.toFixed(2)} €</p>
              </div>

            </div>

          </div>
          {/* Favourites Panel */}
          {/* <div id='Favourites' className={`z-50 fixed bg-[#2e2e2e] top-0 overflow-y-auto h-full w-[45%] max-w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} transition-all ease-in-out duration-300`}>
            <div className='border-b w-full h-[70px] flex justify-start items-center'>
              <button className='text-[1.5rem] ml-[20px]' onClick={() => setCartIsOpen(false)}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>

            <div className='flex flex-col justify-between h-[85vh]'>

              <div id='cart-items-container' className='mt-[10px] pb-[60px] flex flex-col gap-[10px] px-4'>
                {cartItems.length > 0 ?
                  cartItems.map((item) => (
                    <div key={item._id} className='flex justify-between items-center p-2 border-b'>
                      <div className='flex items-center gap-4'>
                        <img src={item.img[0]} className='object-contain w-[70px] h-[70px]' alt='No image' />
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

              <div className="z-10 fixed bottom-0 bg-mainBg w-full p-4 border-t flex justify-between text-lg">
                <p>Total Amount: {totalAmount.toFixed(2)} €</p>
              </div>

            </div>

          </div> */}
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
