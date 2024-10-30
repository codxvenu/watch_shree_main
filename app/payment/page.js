"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../navbar'
import Footer from '../footer'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function payment() {

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[phone,setPhone]=useState("");
    const[area,setArea]=useState("");
    const[city,setCity]=useState("");
    const[state,setState]=useState("");
    const[post_code,setPost_code]=useState("");

    // useEffect(()=>{
    //     fetch('http://localhost:5000/payment')
    //    .then(response => response.json())
    //   .then(data=>{
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
            
    //     })
    // },[])


    const handleNameChange = (event) => {
        setName(event.target.value);
      };
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
      const handlePhoneChange = (event) => {
        setPhone(event.target.value);
      };
    const handleAreaChange = (event) => {
        setArea(event.target.value);
      };
      const handleCityChange = (event) => {
        setCity(event.target.value);
      };
      const handleStateChange = (event) => {
        setState(event.target.value);
      };
      const handlePost_codeChange = (event) => {
        setPost_code(event.target.value);
      };

      const handleSubmit = (event) => {
        localStorage.setItem('email_payment', email)
        event.preventDefault();
        fetch("http://localhost:5000/payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                area: area,
                city: city,
                state: state,
                post_code: post_code
            }),
            credentials: "include"
        })
        .then(async response => {
            const data = await response.json(); // Parse JSON response
            if (response.ok) {
                console.log("Data updated successfully");
                console.log("Payment data received:", data);
                handleOrder();  
            } else {
                // Handle specific error messages from the server
                if (data.error === "Request already in progress") {
                    toast.error("Payment request already in progress");
                } else {
                    toast.error("Failed to send payment request");
                }
                throw new Error(data.error || "Failed to update data");
            }
        })
        .catch(error => {
                console.log(error);
                
                  });
    };
    
    
      const handleOrder = (event) => {
        const email = localStorage.getItem('email_payment');
        const tprice = localStorage.getItem('total_price');
        fetch("http://localhost:5000/create_order",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               email: email,
                total_price: tprice
            }),
            credentials: "include"
        })
       .then(response => response.json())
       .then(data => {
        toast.success("Order created successfully");
        })
        .catch(error => console.error('Error order Request:', error));
      }
  return (
    <div>
        <Navbar/>
        <a href='/cart'>
        <h2 className='pl-12 py-10 text-3xl font-bold'><span className='text-4xl'>&larr;</span>Payment</h2>
            </a>
            
                <div className="flex items-center justify-center pb-12 px-12">
   
                 <div className="mx-auto w-full max-w-[550px] bg-white">
        
                <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                    Full Name
                </label>
                <input type="text" name="name" id="name" placeholder="Full Name" onChange={handleNameChange} value={name}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                    Phone Number
                </label>
                <input type="text" name="phone" id="phone" placeholder="Enter your phone number"  onChange={handlePhoneChange} value={phone}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                    Email Address
                </label>
                <input type="email" name="email" id="email" placeholder="Enter your email"  onChange={handleEmailChange} value={email}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
            </div>
           

            <div className="mb-5 pt-3">
                <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                    Address Details
                </label>
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="area" id="area" placeholder="Enter area"  onChange={handleAreaChange} value={area}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="city" id="city" placeholder="Enter city"  onChange={handleCityChange} value={city}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="state" id="state" placeholder="Enter state" onChange={handleStateChange} value={state}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <input type="text" name="post-code" id="post-code" placeholder="Post Code"  onChange={handlePost_codeChange} value={post_code}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"  type="submit">
                    Pay
                </button>
            </div>
                </form>
    </div>
</div>
<Footer/>
    </div>
  )
}

export default payment
