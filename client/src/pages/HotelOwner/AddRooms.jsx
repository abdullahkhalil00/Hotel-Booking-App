import React, { useState } from 'react'
import Title from '../../component/title'
import { assets } from '../../assets/assets'

const AddRooms = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null
  })

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Backend API Integration ke liye Data Log
    console.log({ images, inputs })
  }

  return (
    <form onSubmit={handleSubmit} className='mb-20 pb-10 max-w-4xl'>     
    <Title
      align='left'
      font='outfit'
      title='Add Room'
      subTitle='Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.'
    />

      {/* Upload Area For Images */}
      <p className='text-gray-800 mt-10 font-medium'>Images</p>

      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className='max-h-24 max-w-24 object-cover cursor-pointer opacity-80 rounded border border-gray-300 hover:opacity-100 transition'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt="Upload preview"
            />
            <input
              type="file"
              id={`roomImage${key}`}
              hidden
              accept="image/*"
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>

      {/* Room Type and Price in One Row */}
      <div className='w-full flex max-sm:flex-col sm:gap-6 mt-4 items-end'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 font-medium'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={e => setInputs({ ...inputs, roomType: e.target.value })}
            className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full outline-none focus:border-blue-500'
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className='text-gray-800 font-medium'>
            Price <span className='text-xs text-gray-500'>/night</span>
          </p>

          <input
            type="number"
            placeholder='0'
            className='border border-gray-300 mt-1 rounded p-2 w-28 outline-none focus:border-blue-500'
            value={inputs.pricePerNight === 0 ? '' : inputs.pricePerNight}
            onChange={e => setInputs({ ...inputs, pricePerNight: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Amenities Section */}
      <p className='text-gray-800 mt-6 font-medium'>Amenities</p>

      <div className='flex flex-col flex-wrap mt-2 text-gray-600 max-w-sm gap-2'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index} className='flex items-center gap-2'>
            <input
              type="checkbox"
              id={`amenity_${index}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity]
                  }
                })
              }
              className='cursor-pointer accent-blue-600 h-4 w-4'
            />
            <label htmlFor={`amenity_${index}`} className='cursor-pointer select-none text-sm'>
              {amenity}
            </label>
          </div>
        ))}
      </div>

      <button type="submit" className='bg-blue-600 text-white font-medium px-8 py-2.5 rounded mt-8 cursor-pointer'>
            Add Room
        </button>
    </form>
  )
}

export default AddRooms