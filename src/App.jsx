import React, { useEffect, useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import './App.css'
import Header from './Components/Header.jsx'
import Home from './Components/Home.jsx'
import VehicleServices from './Components/VehicleServices'

function App() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetch('https://localhost:7189/api/Vehicle')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
  }, []) 


  const match = useMatch('/vehicle/:id')
  const vehicle = match ? vehicles.find((vehicle) => vehicle.id === Number(match.params.id)) : null

  console.log(vehicle)

  // wait for the fetch to complete
  if (vehicles.length === 0) {
    return null
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/vehicle/:id" element={<VehicleServices vehicle={vehicle} /> } />
        <Route path="/" element={<Home vehicles={vehicles}/>} />
      </Routes>
    </>
  )
}

export default App
