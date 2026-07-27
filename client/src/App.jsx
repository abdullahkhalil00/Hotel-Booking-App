import { useState } from 'react'
import Navbar from './component/Navbar'
import { Routes , Route , useLocation } from 'react-router-dom'
import { Home } from './pages/Home'
import Footer from './component/Footer'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBooking'
import { HotelReg } from './component/HotelReg'
import Layout from './pages/HotelOwner/Layout'
import Dashbord from './pages/HotelOwner/Dashbord'
import AddRooms from './pages/HotelOwner/AddRooms'
import ListRooms from './pages/HotelOwner/ListRooms'
import { Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

function App() {
  const isOwner  = useLocation().pathname.includes('owner')
  const {showHotelReg}  = useAppContext()
  return (
    <>
      <Toaster/>
      { !isOwner &&  < Navbar/> }
      {showHotelReg && <HotelReg/>}
      <div className='min-h-[70vh]' >
        <Routes>
          <Route  path='/' element={<Home/>}></Route>
          <Route  path='/rooms' element={<AllRooms/>}></Route>
          <Route  path='/rooms/:id' element={<RoomDetails/>}></Route>
          <Route  path='/my-bookings' element={<MyBookings/>}></Route>
          <Route  path='/owner' element={<Layout/>}>
            <Route  index element={<Dashbord/>}></Route>
            <Route  path='add-room'  element={<AddRooms/>}></Route>
            <Route  path='list-room' element={<ListRooms/>}></Route>
          </Route>

        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
