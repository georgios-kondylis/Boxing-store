import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const transition = 'transition-all ease-in-out duration-300';

const Navbar = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <>
      <div id='navbar-container' className='text-white w-full bg-[#1a1a1a] border-b flex justify-center'>

        <div id='navbar' className='relative w-full items-center flex justify-around h-[70px]'>
          <div id='logo' className='flex items-center gap-[0px]'>
            <img className='w-[70px]' src="/logoBox.png" alt="" />
            <h1>Gamias</h1>
          </div>

          <div id='navlinks' className='flex gap-[20px] justify-around'>
            <NavLink to='/gloves' className='hover:text-gray-300'>Gloves</NavLink>
            <NavLink to='/wraps' className='hover:text-gray-300'>Wraps</NavLink>
            <NavLink to='/mouthpiece' className='hover:text-gray-300'>Mouthpiece</NavLink>
            <NavLink to='/shoes' className='hover:text-gray-300'>Shoes</NavLink>
          </div>

          <div id='cart' className='cursor-pointer flex items-center gap-2' onClick={() => setCartIsOpen(true)}>
            <i className="fa-solid fa-cart-shopping"></i>
          </div>

          {/* Side Cart Panel */}
          <div id='sidenav' className={`absolute bg-[#2e2e2e] top-0 h-[100vh] w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} ${transition}`}>
            <div className='border-b w-full h-[70px] flex justify-around items-center'>
              <button className=' text-xl' onClick={() => setCartIsOpen(false)}>X</button>
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
