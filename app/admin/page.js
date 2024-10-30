"use client"
import React, { useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer';

function Admin() {
    // States for each form field
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [feature, setFeature] = useState('');
    const [feature_description, setFeatureDescription] = useState('');
    const [img, setImg] = useState(null);

    // Event handlers for each input field
    const handleNameChange = (e) => setName(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handletypeChange = (e) => setType(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleFeatureChange = (e) => setFeature(e.target.value);
    const handleFeatureDescriptionChange = (e) => setFeatureDescription(e.target.value);
    const handleImgChange = (e) => setImg(e.target.value); // Handles file input

    // Function to handle form submission
    const additem = (e) => {
        e.preventDefault(); // Prevents default form submission
    
        // Construct the data object to be sent as JSON
        const data = {
            name: name,
            price: price,
            type: type,
            description: description,
            feature: feature,
            feature_description: feature_description,
            img: img // URL of the image
        };
    
        fetch("http://localhost:5000/admin/additem", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify(data) // Convert data object to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Return the response data as JSON
        })
        .then(data => {
            console.log(data); // Handle response data here
            // Reset form fields after successful submission
            setName('');
            setPrice('');
            setType('');
            setDescription('');
            setFeature('');
            setFeatureDescription('');
            setImg('');
        })
        .catch(error => console.error('Error:', error));
    };
    

    return (
        <div>
            <Navbar />
            <div className=''>
                <h2 className='pl-12 pt-5 text-4xl font-bold'>Add Items</h2>
                <form onSubmit={additem} className='p-12 w-2/6 flex flex-col justify-center'>
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">Name</label>
                    <input type="text" placeholder='name' name='name' id='name' onChange={handleNameChange} value={name} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />

                    <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">Price</label>
                    <input type="text" placeholder='price' name='price' onChange={handlePriceChange} value={price} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />

                    <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">Description</label>
                    <input type="text" placeholder='description' name='description' onChange={handleDescriptionChange} value={description} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                   
                    <label htmlFor="type" className="mb-3 block text-base font-medium text-[#07074D]">Type</label>
                  <select name="type" onChange={handletypeChange} id="type"  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                    <option value="automatic">AutoMatic</option>
                    <option value="chronological">Chronological</option>
                    <option value="digital">Digital</option>
                    <option value="smart">Smart</option>
                  </select>
                    <label htmlFor="feature" className="mb-3 block text-base font-medium text-[#07074D]">Feature</label>
                    <input type="text" placeholder='feature' name='feature' onChange={handleFeatureChange} value={feature} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />

                    <label htmlFor="feature_description" className="mb-3 block text-base font-medium text-[#07074D]">Feature Description</label>
                    <input type="text" placeholder='feature description' name='feature_description' onChange={handleFeatureDescriptionChange} value={feature_description} className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />

                    <label htmlFor="image" className="mb-3 block text-base font-medium text-[#07074D]">Image</label>
                    <input type="text" onChange={handleImgChange} name='img' className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>

                    <button type='submit' className="hover:shadow-form w-full mt-10 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
