"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import "./page.css";
import { useRouter } from 'next/navigation';

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const router = useRouter();
    const [item, setItem] = useState(null); // Initialize with null to ensure proper render control
    const [cartsrc, setCartsrc] = useState(''); // Separate image state initialization
    const [tab, setTab] = useState("desc"); // Tab state remains the same
    
    useEffect(() => {
        const data = localStorage.getItem("item");

        if (!data) {
            router.push('/');  // Redirect if no item in localStorage
        } else {
            const parsedItem = JSON.parse(data);
            setItem(parsedItem);
            setCartsrc(parsedItem.img); // Initialize image source once item is set
        }
    }, [router]); // Always keep the dependency array minimal

    // Handle image change
    const handleimgchange = (e) => {
        const src = e.target.src;
        setCartsrc(src);
    };

    // Handle tab switching
    const handleTabClick = (tab) => {
        setTab(tab);
    };

    const handleadditem = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                toast.error("User not found. Please log in.");
                return;
            }
    
            const response = await fetch("http://localhost:5000/addcart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    quantity: 1,
                    email: email,
                    description: item.description,
                    type: item.type
                }),
                credentials: "include", // Include cookies in the request
            });
    
            if (response.ok) {
                toast.success("Item added to cart");
            } else {
                const errorData = await response.json();
                toast.error(`Failed to add item: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            toast.error("An error occurred while adding the item to the cart");
        }
    };
    
    if (!item) {
        // Return a loading state while the item is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className='main'>
            <Navbar />
            <section>
                <div className="item-card flex gap-5">
                    <ul>
                        <li onClick={handleimgchange}>
                            <img src={item.img} alt={item.name} className='active rounded-2xl' />
                        </li>
                        <li onClick={handleimgchange}>
                            <img src={item.img2} alt={item.name} className='rounded-2xl' />
                        </li>
                        <li onClick={handleimgchange}>
                            <img src={item.img3} alt={item.name} className='rounded-2xl'/>
                        </li>
                    </ul>
                    <span className="m-img w-80">
                        <img src={cartsrc} alt={item.name} className='rounded-2xl' />
                    </span>
                    <div className="content ml-5 mt-2">
                        <h1 className='text-4xl'>{item.name}</h1>
                        <h3 className='text-2xl mt-6'>{item.price}</h3>
                        <p className='mt-4 w-3/4'>{item.description}</p>
                        <button type="button" onClick={()=>{
                         
                            handleadditem();
                        }}>Add to Cart</button>
                    </div>
                </div>
                <div className="cart-data p-12">
                    <ul className='flex flex-row w-full justify-center gap-10'>
                        <li className='text-xl' onClick={() => handleTabClick("desc")}>Description</li>
                        <li className='text-xl' onClick={() => handleTabClick("review")}>Reviews (3)</li>
                        <li className='text-xl' onClick={() => handleTabClick("delivery")}>Shipping & Delivery</li>
                    </ul>
                    {tab === "desc" && (
                        <div className="data flex p-12">
                            <div className="content w-3/6 p-12">
                                <h1 className='text-2xl font-bold mb-4'>{item.name}</h1>
                                <p>{item.description}</p>
                                {item.feature && (
                                    <span>
                                        <h1 className='text-2xl font-bold mb-4 mt-4'>{item.feature}</h1>
                                        <p>{item.feature_description}</p>
                                    </span>
                                )}
                            </div>
                            <span className='flex gap-10'>
                                <img src={item.img} alt="" className='w-60' />
                                <img src={item.img2} alt="" className='w-60' />
                            </span>
                        </div>
                    )}
                    {tab === "delivery" && (
                        <div className='p-32 flex justify-between'>
                            <div className="data">
                                <h2 className="text-2xl font-bold mb-4">Shipping & Delivery Information</h2>
                                <h3 className="text-xl font-semibold mb-2">Shipping Options</h3>
                                <ul className="list-disc list-inside mb-4">
                                    <li><strong>Standard Shipping:</strong> Delivered within 5-7 business days. Free on orders over $50.</li>
                                    <li><strong>Expedited Shipping:</strong> Delivered within 2-3 business days. Charges apply.</li>
                                    <li><strong>Next-Day Shipping:</strong> Delivered by the next business day. Premium charges apply.</li>
                                </ul>
                            </div>
                            <img src="https://basel-cec2.kxcdn.com/basel/wp-content/uploads/2015/08/shipping.jpg" alt="" />
                        </div>
                    )}
                </div>
            </section>
            <Footer />
          
        </div>
    );
};

export default Product;
