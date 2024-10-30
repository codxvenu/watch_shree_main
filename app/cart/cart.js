"use client";
import React,{useEffect, useState} from 'react'
import "./cart.css";
function cart({ onClose }) {
    const [item , setItem] = useState([]);
    const [tprice , setTprice] = useState([]);

    useEffect(() => {
      // This code runs only on the client side
      const storedItem = localStorage.getItem("usercart");
      console.log(storedItem);
      
      if (storedItem) {
          const parsedItem = JSON.parse(storedItem);
          setItem(parsedItem);
          console.log(typeof(storedItem));
          console.log(parsedItem);
      }
  }, []); // This useEffect will only run once on mount
  
  useEffect(() => {
      // Recalculate total price whenever `item` changes
      const handleprice = () => {
          let total = 0;
          item.forEach((item) => {
              console.log(item.price, "price");
              total += item.price * item.quantity;
          });
          setTprice(total);
          localStorage.setItem('total_price', total);
      };
      
      if (item) {
          handleprice();
      } 
  }, [item]); // Depend on `item` so it recalculates whenever `item` is updated
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`/createOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
            }),
          });
         const resultss = await response.json()
          console.log(resultss);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
     
  return (
    <div className='main-cart w-full bg-transparent'>
<div className="layout w-96  h-full z-10 relative right-0 bg-white">
  <div>
        <span className='flex justify-between bg-black text-white items-center p-8'>
        <h1 className='text-2xl'>Shopping Cart</h1>
        <small onClick={onClose}>Close</small>
        </span>
        {item.map((item,index)=>(

       
        <div className="content pt-5 pb-5 px-8 flex gap-5" key={index}>
            <img src={item.img} alt=""/>
            <span className='flex flex-col gap-5'>
         
            <h1>{item.name}</h1>
            <small>{item.quantity}x{item.price}</small>
            </span>
           
           
        </div> ))}
        <hr />
        <span className='flex justify-between p-6'>
        <h1>SubTotal:</h1>
        <h1 className='small'>₹{tprice}</h1>
        </span> 
        <hr />
        <small className='ml-10 mt-4 block'>Add ₹{3000-tprice} to cart and get free shipping!</small>
     
        <div className="btns flex flex-col gap-5 w-11/12 m-auto">
        <button className='mt-5 veiw ' onClick={()=>{window.location.href="/cart"}}>VIew Cart</button>
        <button onClick={()=>{window.location.href= "/payment"}}>CheckOut</button>
        </div>
        </div>


      <div>
        
      </div>

      </div>   </div>
  )
}

export default cart
