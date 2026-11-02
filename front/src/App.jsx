import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { Nav } from './components/Nav'
import { BusSearch } from './components/BusSearch'
import { Footer } from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Route } from 'lucide-react'
import BusResult from "./pages/BusResult";
import SeatSelection from './pages/seatSelection'
import Passenger from './pages/Passenger'
import Payment from './pages/Payment'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import Help from './pages/Help'
import WhyRoutex from './components/WhyRoutex'
import Testimonials from './components/Testimonials'
import About from './components/About'
import PopularRoutes from './components/PopularRoutes'


function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/"
            element={
              <>
                <Nav />

                {/* <BusSearch /> */}
                <PopularRoutes/>
                <WhyRoutex/>
                <Testimonials/>
                <About/>
                <Footer />
              </>
            } />

          <Route path="/login"
            element={<Login />} />

          <Route path="/Register"
            element={<Register />} />

          <Route path="/BusResult"
            element={<BusResult />} />

          <Route path="/seatSelection/:busId"
            element={<SeatSelection />} />


          <Route path='/Passenger'
            element={<Passenger />} />

          <Route path='/Payment'
            element={<Payment />} />

          <Route path='/MyBookings'
            element={<MyBookings />} />


          <Route path="/Profile"
            element={<Profile />} />


          <Route path="/buses"
            element={<BusResult/>} />

          <Route path="/Offers"
          element={<Offers/>} />

          <Route path="/Help"
          element={<Help/>} />

        </Routes>

      </BrowserRouter>


    </>
  )
}

export default App
