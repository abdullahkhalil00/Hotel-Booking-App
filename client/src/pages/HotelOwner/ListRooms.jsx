import React from 'react'
import Title from '../../component/title'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
const ListRooms = () => {
  const [rooms, setRooms] = useState([])
  const { axios, getToken, user } = useAppContext();

  // Fetch Rooms of the Hotel Owner
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms/owner", {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  // Toggle Availability of the Room
  const toggleAvailability = async (roomId) => {
    try {
      const { data } = await axios.post(
        "/api/rooms/toggle-availability",
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchRooms();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchRooms()
    }
  }, [user]
  )
  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle="View, edit,
or manage all listed rooms. Keep the information up-to-date to provide the
best experience for users."/>

      <div>
        <p className='text-gray-500 mt-8 font-medium'>All Rooms</p>

        <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-auto mt-3 bg-white'>
          <table className='w-full border-collapse'>
            <thead className='bg-gray-50 border-b border-gray-200 sticky top-0 z-10'>
              <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facility</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Price / night</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 text-sm'>
              {/* Yahan aap rooms list render kar sakte hain */}
              {rooms?.map((room, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='py-3 px-4 text-gray-700 font-medium'>{room.roomType}</td>
                  <td className='py-3 px-4 text-gray-500 max-sm:hidden'>{room.amenities?.join(', ')}</td>
                  <td className='py-3 px-4 text-gray-700'>${room.pricePerNight}</td>
                  <td className='py-3 px-4 border-t border-gray-300 text-sm text-center'>
                    <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                      <input
                      
                        type="checkbox"
                        className='sr-only peer'
                        checked={room.isAvailable}
                        onChange={() => {
                          toggleAvailability(room._id)
                        }}
                      />
                      <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}

export default ListRooms