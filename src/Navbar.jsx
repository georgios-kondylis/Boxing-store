import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const transition = 'transition-all ease-in-out duration-300';

const Navbar = ({cartIsOpen, setCartIsOpen}) => {
  
  const [cartItems, setCartItems] = useState([]); // Array to store the cart items i will fetch from my mongoDB

  useEffect(() => {
    const fetchCartData = async () => {
      try{
        const res = await fetch('http://localhost:5000/add-to-cart')
        const cardDataInJson = await res.json();
        setCartItems(cardDataInJson);
        console.log(cardDataInJson)
      } catch (err) {
        console.log(`olo malakies : ${err}`)
      }
    }
    fetchCartData();
  },[])


  return (
    <>
      <div id='navbar-container' className='text-white w-full bg-[#1a1a1a] border-b flex justify-center'>

        <div id='navbar' className='relative w-full items-center flex justify-around h-[70px]'>
          <div id='logo' className='flex items-center gap-[0px]'>
            <img className='w-[70px]' src="/logoBox.png" alt="" />
            <h1>Gamias</h1>
          </div>

          <div id='navlinks' className='flex gap-[20px] justify-around'>
            <NavLink to='/boxers' className='hover:text-gray-300'>Boxers</NavLink>
            <NavLink to='/gloves' className='hover:text-gray-300'>Gloves</NavLink>
            <NavLink to='/wraps' className='hover:text-gray-300'>Wraps</NavLink>
            <NavLink to='/mouthpiece' className='hover:text-gray-300'>Mouthpiece</NavLink>
            <NavLink to='/shoes' className='hover:text-gray-300'>Shoes</NavLink>
          </div>

          <div id='cart' className='cursor-pointer flex items-center gap-2' onClick={() => setCartIsOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>

          {/* Side Cart Panel */}
          <div id='sidenav' className={`z-50 absolute bg-[#2e2e2e] top-0 h-[100vh] w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} ${transition}`}>
            <div className='border-b w-full h-[70px] flex justify-around items-center'>
              <button className=' text-xl' onClick={() => setCartIsOpen(false)}>X</button>
              <i className="fa-solid fa-cart-shopping"></i>
            </div>

            <div className='mt-[10px] flex flex-col gap-[10px]'>
              {cartItems.map((item) => (
                <div className='flex justify-between px-[10px]'>
                  <div key={item._id} className=' flex items-center justify-start gap-[10px]'> 
                  <img className='rounded-full object-contain w-[70px] h-[70px]' 
                      src={item.img[0]} 
                        alt={'No image'} />
                    <p key={item.id}>{item.brand}
                    </p>
                  </div>

                  <div className='flex gap-[10px] items-center  text-white'>
                    <button className='rounded-full hover:scale-[1.2] transition-all duration-300 ease-in-out text-[1.5rem]'>
                      <i className="fa-solid fa-circle-minus"></i>
                    </button>

                    <p>5</p>

                    <button className='rounded-full hover:scale-[1.2] transition-all duration-300 ease-in-out text-[1.5rem]'>
                      <i className="fa-solid fa-circle-plus"></i>
                    </button>
                  </div>
                  <button className='rounded-full  hover:scale-[1.2] hover:text-[#eb5656e6] transition-all duration-300 ease-in-out text-[1.5rem]'>
                    <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
               ))}
            </div>
          </div>
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
