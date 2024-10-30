"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';
import { useRouter } from 'next/navigation';

function Home() {
  const [data, setData] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:5000/product_list")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        setData(data);
    })
},[]);
  const router = useRouter();

  const handleInfo = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    localStorage.setItem("item", JSON.stringify(selectedItem));
    if (selectedItem) {
      router.push("/product");
    } else {
      console.error("Item not found for id:", id);
    }
  };
  

  return (
    <div className='main'>
      <Navbar />
      <div className='h-[120px] w-full flex justify-center gap-20'>
        <a className='p-4'><img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full bg-black h-[120px] w-[120px]' /></a>
        <a className='p-4'><img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full bg-black h-[120px] w-[120px]' /></a>
        <a className='p-4'><img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full bg-black h-[120px] w-[120px]' /></a>
        <a className='p-4'><img src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full bg-black h-[120px] w-[120px]' /></a>
      
      </div>
      <section className='p-5'>
        <div className="sec-1 flex flex-col gap-10 pt-10">
          <span className='flex gap-x-5 justify-center'>
          <hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          <h1 className='text-[2rem] font-semibold text-center mt-[-25px]'>AutoMatic</h1>
<hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          </span>
     
          <div className="cardgroup flex gap-5 flex-row overflow-auto scrollbar-hide py-2">
            {data.filter(item => item.type === "automatic")
            .map((content) => (
              <div 
                key={content.id} 
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 flex-shrink-0 cursor-pointer" 
                onClick={() => handleInfo(content.id)}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                  <img src={content.img} alt={content.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {content.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${content.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {content.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sec-1 flex flex-col gap-10 pt-10">
        <span className='flex gap-x-5 justify-center'>
          <hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          <h1 className='text-[2rem] font-semibold text-center mt-[-25px]'>Chronological</h1>
<hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          </span>
          <div className="cardgroup flex gap-5 flex-row overflow-auto scrollbar-hide py-2">
            {data.filter(item => item.type === "chronological").map((content) => (
              <div
                key={content.id} 
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 flex-shrink-0 cursor-pointer" 
                onClick={() => handleInfo(content.id)}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                  <img src={content.img} alt={content.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {content.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${content.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {content.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sec-1 flex flex-col gap-10 pt-10">
          <span className='flex gap-x-5 justify-center'>
          <hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          <h1 className='text-[2rem] font-semibold text-center mt-[-25px]'>Digital</h1>
<hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          </span>
     
          <div className="cardgroup flex gap-5 flex-row overflow-auto scrollbar-hide py-2">
            {data.filter(item => item.type === "digital")
            .map((content) => (
              <div 
                key={content.id} 
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 flex-shrink-0 cursor-pointer" 
                onClick={() => handleInfo(content.id)}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                  <img src={content.img} alt={content.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {content.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${content.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {content.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sec-1 flex flex-col gap-10">
        <span className='flex gap-x-5 justify-center'>
          <hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          <h1 className='text-[2rem] font-semibold text-center mt-[-25px]'>Smart</h1>
<hr className='text-black border-t-1 border-gray-950 w-1/4'/>
          </span>
          <div className="cardgroup flex gap-5 flex-row overflow-auto scrollbar-hide py-2">
            {data.filter(item => item.type === "Smart").map((content) => (
              <div
                key={content.id} 
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72 flex-shrink-0 cursor-pointer" 
                onClick={() => handleInfo(content.id)}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-52">
                  <img src={content.img} alt={content.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {content.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${content.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    {content.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
