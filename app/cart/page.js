"use client"
import React,{useState,useEffect} from 'react'
import Navbar from '../navbar'
import Footer from '../footer';
import Cart from '../cart/cart';
function cartpage() {
    const [data, setData] = useState([]);
    const [cart , isCart] = useState(false);


    useEffect(()=>{
      const email  = localStorage.getItem('userEmail');
      fetch(`/user/cart?email=${email}` )
      .then((res) => res.json())
      .then((data) => {
          setData(data);
          console.log(    (data));
          
          localStorage.setItem('usercart', JSON.stringify(data));
      })
  },[]);

  const handlecart = ()=>{
    isCart(true);
    
}
const closeCart = () => {
    isCart(false);
};
  return (
    <div className='main'>
      <Navbar/>
      <section className='p-6'>
      <h1 className='text-5xl font-bold'>Cart</h1>
      <div className="cards p-6">
      <div className="cardgroup flex gap-5 flex-row overflow-auto scrollbar-hide py-2">
            {data.map((content) => (
              <div
                key={content.id}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-64 flex-shrink-0 cursor-pointer" >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-44">
                  <img src={content.img} alt={content.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {content.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ₹{content.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {content.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button" onClick={handlecart}
                  >
                    CheckOut
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
      </section>
      <Footer/>
     {cart && (
            <Cart onClose={closeCart} ></Cart>
           )
           } 
    </div>
    
  )
}

export default cartpage
