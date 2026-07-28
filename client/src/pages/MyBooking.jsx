import React, { useEffect, useState } from 'react'
import Title from '../component/title'
import { userBookingsDummyData, assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
const MyBookings = () => {
    const { axios, getToken, user } = useAppContext();
    const [bookings, setBookings] = useState([]);

    const fetchUserBookings = async () => {
        try {
            const { data } = await axios.get("/api/bookings/user", {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });

            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    useEffect(() => {
        if (user) {
            fetchUserBookings()
        }
    }, [user])
    // Fallback image in case room image fails to load
    const fallbackImage = "https://via.placeholder.com/300x200?text=Room+Image";

    return (
        <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
            <Title
                title='My Bookings'
                subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks'
                align='left'
            />

            <div className='max-w-6xl mt-8 w-full text-gray-800'>
                {/* Table Header for Desktop */}
                <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                    <div>Hotels</div>
                    <div>Date & Timings</div>
                    <div>Payment</div>
                </div>

                {/* Bookings List */}
                {bookings.map((booking) => (
                    <div
                        key={booking._id}
                        className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t gap-4 md:gap-0'
                    >
                        {/* 1. Hotel Details */}
                        <div className='flex flex-col md:flex-row items-start'>
                            <img
                                src={booking?.room?.images?.[0] || fallbackImage}
                                alt="hotel-img"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = fallbackImage;
                                }}
                                className='w-full md:w-44 h-32 rounded shadow object-cover'
                            />
                            <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                                <p className='font-playfair text-xl md:text-2xl font-semibold'>
                                    {booking?.hotel?.name}{' '}
                                    <span className='font-inter text-sm font-normal text-gray-600'>
                                        ({booking?.room?.roomType})
                                    </span>
                                </p>
                                <div className='flex items-center gap-1 text-sm text-gray-500'>
                                    <img src={assets.locationIcon} alt="location-icon" className="w-4 h-4" />
                                    <span>{booking?.hotel?.address}</span>
                                </div>
                                <p className='text-xs text-gray-500 mt-1'>
                                    Guests: <span className='font-medium text-gray-700'>{booking?.guests || 1}</span>
                                </p>
                                <p className='text-base'>Total: ${booking.totalPrice}</p>
                            </div>
                        </div>

                        {/* 2. Date & Timings */}
                        <div className='flex flex-row md: items-center md : gap-12 mt-3 gap-8'>
                            <div>
                                <p>Check-In :</p>
                                <p className='className="text-gray-500 text-sm"'>
                                    {new Date(booking.checkInDate).toDateString()}
                                </p>
                            </div>
                            <div>
                                <p>Check-Out :</p>
                                <p className='className="text-gray-500 text-sm"'>
                                    {new Date(booking.checkOutDate).toDateString()}
                                </p>
                            </div>
                        </div>



                        {/* 3. Payment Status */}
                        <div className='flex flex-col items-start justify-center pt-3'>
                            <div className='flex items-center gap-2'>
                                <div className={`h-3 w-3 rounded-full ${booking?.isPaid ? "bg-green-500" : "bg-red-500"}`}></div>
                                <p className={`text-sm ${booking?.isPaid ? "text-green-500" : "text-red-500"}`}>
                                    {booking?.isPaid ? "Paid" : "Unpaid"}
                                </p>
                            </div>
                            {!booking.isPaid && (
                                <button className='px-4 py-1.5 mt-4 text-xs border border-gray-400
rounded-full hover:bg-gray-50 transition-all cursor-pointer'>
                                    Pay Now
                                </button>

                            )}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

export default MyBookings