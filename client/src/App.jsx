import { useState } from 'react'
import Navbar from './component/Navbar'
import { Routes , Route , useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import Footer from './component/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBooking'
import { HotelReg } from './component/HotelReg'


function App() {
  const isOwner  = useLocation().pathname.includes('owner')
  return (
    <>
      { !isOwner &&  < Navbar/> }
      <HotelReg/>
      <div className='min-h-[70vh]' >
        <Routes>
          <Route  path='/' element={<Home/>}></Route>
          <Route  path='/rooms' element={<AllRooms/>}></Route>
          <Route  path='/rooms/:id' element={<RoomDetails/>}></Route>
          <Route  path='/my-bookings' element={<MyBookings/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
