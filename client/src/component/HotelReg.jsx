import React from 'react'
import { assets, cities } from '../assets/assets'

export const HotelReg = ({ onClose }) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70'>
            <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2 overflow-hidden shadow-2xl'>
                
                {/* Left Side Image */}
                <img 
                    src={assets.regImage} 
                    alt="reg-image" 
                    className='w-1/2 rounded-l-xl hidden md:block object-cover'
                />

                {/* Right Side Form Content */}
                <div className='relative flex flex-col items-center w-full md:w-1/2 p-8 md:p-10 bg-white'>
                    {/* Close Icon */}
                    <img 
                        src={assets.closeIcon} 
                        alt="close-icon" 
                        onClick={onClose}
                        className='absolute top-4 right-4 h-4 w-4 cursor-pointer hover:opacity-75 transition-opacity'
                    />

                    <p className='text-2xl font-semibold mt-2 text-gray-800'>Register Your Hotel</p>

                    {/* Hotel Name */}
                    <div className='w-full mt-4'>
                        <label htmlFor="name" className="font-medium text-gray-500 text-sm">
                            Hotel Name
                        </label>
                        <input 
                            type="text" 
                            id='name' 
                            placeholder="Type here" 
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light text-gray-700" 
                            required 
                        />
                    </div>

                    {/* Phone */}
                    <div className='w-full mt-4'>
                        <label htmlFor="contact" className="font-medium text-gray-500 text-sm">
                            Phone
                        </label>
                        <input 
                            type="text" 
                            id='contact' 
                            placeholder="Type here" 
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light text-gray-700" 
                            required 
                        />
                    </div>

                    {/* Address */}
                    <div className='w-full mt-4'>
                        <label htmlFor="address" className="font-medium text-gray-500 text-sm">
                            Address
                        </label>
                        <input 
                            type="text" 
                            id='address' 
                            placeholder="Type here" 
                            className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light text-gray-700" 
                            required 
                        />
                    </div>

                    {/* Select City from Dropdown */}
                    <div className='w-full mt-4 max-w-60 mr-auto'>
                        <label htmlFor="city" className="font-medium text-gray-500 text-sm">
                            City
                        </label>
                        <select 
                            id="city" 
                            className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light text-gray-700 bg-white'
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6 font-medium'
                    >
                        Register
                    </button>

                </div>
            </form>
        </div>
    )
}