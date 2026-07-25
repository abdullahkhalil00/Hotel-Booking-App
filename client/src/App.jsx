import { useState } from 'react'
import Navbar from './component/Navbar'
import { Routes , Route , useLocation } from 'react-router-dom'
import { Home } from './pages/Home'


function App() {
  const isOwner  = useLocation().pathname.includes('owner')
  return (
    <>
      { !isOwner &&  < Navbar/> }
      <div className='min-h-[70vh]' >
        <Routes>
          <Route  path='/' element={<Home/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
