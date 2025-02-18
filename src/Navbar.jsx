import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Navbar = ({cartIsOpen, setCartIsOpen}) => {
  const transition = 'transition-all ease-in-out duration-300';
  const [cartItems, setCartItems] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  

  useEffect(() => {
    const fetchCartData = async () => {
      try{
        const res = await fetch('http://localhost:5000/add-to-cart')
        const cardDataInJson = await res.json();
        setCartItems(cardDataInJson);
        setCartLength(cardDataInJson.length);
        console.log(cardDataInJson)
      } catch (err) {
        console.log(`olo malakies : ${err}`)
      }
    }
    fetchCartData();
  },[cartItems])

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/add-to-cart/${id}`, {method: 'DELETE'})
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id))
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0); 

  return (
    <>
      <div id='navbar-container' className='text-white w-full bg-[#292929] border-b flex justify-center'>

        <div id='navbar' className='relative w-full items-center flex justify-around h-[70px]'>
          <div id='logo' className='flex items-center gap-[0px]'>
            <img className='w-[70px]' src="/logoBox.png" alt="" />
            <h1>Gamias</h1>
          </div>

          <div id='navlinks' className='flex gap-[20px] justify-around'>
            <NavLink to='/boxers' className='hover:text-gray-300'>Boxers</NavLink>
            <NavLink to='/gloves' className='hover:text-gray-300'>Gloves</NavLink>
            <NavLink to='/gloves' className='hover:text-gray-300'>Head-gear</NavLink>
            <NavLink to='/wraps' className='hover:text-gray-300'>Wraps</NavLink>
            <NavLink to='/mouthpiece' className='hover:text-gray-300'>Mouthpiece</NavLink>
            <NavLink to='/shoes' className='hover:text-gray-300'>Shoes</NavLink>
          </div>

          <div id='Cart-&-Heart' className='text-[1.4rem] flex items-center gap-[20px]'>
            <div className='relative cursor-pointer'  onClick={() => setCartIsOpen(true)}>
              <i className="text-[1.4rem] fa-solid fa-cart-shopping"></i>
              <div className={`absolute ${cartLength < 1 ? 'hidden' : ''} top-[-5px] right-[-10px] w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#dc3030]`}>
                <p className='text-[13px]'>{cartLength}</p>
              </div>
            </div>

            <div>
               <i class="fa-solid fa-heart-circle-check"></i>
            </div>
          </div>

          {/* Side Cart Panel */}
          <div id='sidenav' className={`z-50 fixed bg-[#2e2e2e] top-0 overflow-y-auto h-full w-[400px] ${cartIsOpen ? 'right-0' : 'right-[-500px]'} transition-all ease-in-out duration-300`}>
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
        </div>

      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
