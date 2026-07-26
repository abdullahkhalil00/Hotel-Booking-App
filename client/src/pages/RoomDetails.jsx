import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { roomsDummyData } from '../assets/assets'
import StarRating from '../component/starRating'
import { assets } from '../assets/assets'
import { facilityIcons } from '../assets/assets'
import { roomCommonData } from '../assets/assets'
const RoomDetails = () => {
    const { id } = useParams()
    const [room, setRoom] = useState(null)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        const foundRoom = roomsDummyData.find(r => r._id === id)
        if (foundRoom) {
            setRoom(foundRoom)
            setMainImage(foundRoom.images[0])
        }
    }, [id])

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            {/* Room Details Header */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>
                    {room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>
                    20% OFF
                </p>
            </div>

            {/* Room Rating */}
            <div className='flex items-center gap-1 mt-2'>
                <StarRating />
                <p className='ml-2 text-sm text-gray-600'>200+ reviews</p>
            </div>

            {/* Room Address */}
            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Images Gallery */}
            <div className='flex flex-col lg:flex-row mt-6 gap-6'>
                {/* Main Large Image */}
                <div className='lg:w-1/2 w-full'>
                    <img
                        src={mainImage}
                        alt="Main Room"
                        className='w-full h-96 lg:h-[450px] rounded-xl shadow-lg object-cover'
                    />
                </div>

                {/* Thumbnails Grid */}
                <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full h-fit'>
                    {room?.images?.length > 0 && room.images.map((image, index) => (
                        <img
                            key={index}
                            onClick={() => setMainImage(image)}
                            src={image}
                            alt={`Room Thumbnail ${index + 1}`}
                            className={`w-full h-44 rounded-xl shadow-md object-cover cursor-pointer transition-all ${mainImage === image ? 'outline-3 outline-orange-500' : ''
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Room Highlights */}
            <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center mt-10 gap-4'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>
                        Experience Luxury Like Never Before
                    </h1>

                    {/* Amenities Grid */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Room Price */}
                <p className='text-2xl font-medium text-gray-800'>${room.pricePerNight}/night</p>
            </div>

            {/* Check-In, Check-Out Form */}
            <form className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 text-gray-500 w-full md:w-auto'>

                    {/* Check-In */}
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="checkInDate" className='font-medium text-sm text-gray-700'>Check-In</label>
                        <input
                            type="date"
                            id='checkInDate'
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>

                    {/* Check-Out */}
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="checkoutDate" className='font-medium text-sm text-gray-700'>Check-Out</label>
                        <input
                            type="date"
                            id='checkoutDate'
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>
                    <div className='w-px h-[60px] bg-gray-300/70 max-md:hidden'></div>
                    {/* Guests */}
                    <div className='flex flex-col w-full md:w-auto'>
                        <label htmlFor="guests" className='font-medium text-sm text-gray-700'>Guests</label>
                        <input
                            type="number"
                            id='guests'
                            min="1"
                            placeholder='1'
                            className='w-full md:max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='bg-blue-500  active:scale-95 transition-all text-white font-medium rounded-md w-full md:w-auto md:px-10 py-3 md:py-4 text-base cursor-pointer'
                >
                    Check Availability
                </button>
            </form>

            <div className='mt-24 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className='flex items-start gap-3'>
                        <img
                            src={spec.icon}
                            alt={`${spec.title}-icon`}
                            className='w-6 h-6 mt-0.5 object-contain'
                        />
                        <div>
                            <p className='text-base font-medium text-gray-800'>{spec.title}</p>
                            <p className='text-sm text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='max-w-3x1 border-y border-gray-300 my-15 py-10 text-gray-500'>
                <p>Guests will be allocated on the ground floor according to availability.
                    You get a comfortable Two bedroom apartment has a true city feeling. The
                    price quoted is for two guest, at the guest slot please mark the number of
                    guests to get the exact price for groups. The Guests will be allocated
                    ground floor according to availability. You get the comfortable two bedroom
                    apartment that has a true city feeling .</p>
            </div>
            <div className='flex flex-col items-start gap-4 mt-8'>
                <div className='flex items-center gap-4'>
                    <img
                        src={room.hotel.owner.image}
                        alt="Host"
                        className='h-14 w-14 md:h-18 md:w-18 rounded-full object-cover invert'
                    />
                    <div>
                        <p className='text-lg md:text-xl font-medium text-gray-800'>
                            Hosted by {room.hotel.name}
                        </p>
                        <div className='flex items-center mt-1 text-sm text-gray-600'>
                            <StarRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
                <div></div>
            </div>
        </div>
    )
}

export default RoomDetails