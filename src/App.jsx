import React, { useEffect, useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import './Styles/App.css'
import Header from './Components/Header.jsx'
import Home from './Components/Home.jsx'
import VehicleServices from './Components/VehicleServices'
import ManageVehicles from './Components/ManageVehicles'

function App() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetch('https://localhost:7189/api/Vehicle')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
  }, []) 


  const match = useMatch('/vehicle/:id')
  const vehicle = match ? vehicles.find((vehicle) => vehicle.id === Number(match.params.id)) : null

    // wait for the fetch to complete
    if (vehicles.length === 0) {
      return (
          <div className="App">
              <Header />
              <Spinner mt='16' color="black" size="xl" />
          </div>
      )
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/manage" element={<ManageVehicles/>} />
        <Route path="/vehicle/:id" element={<VehicleServices vehicle={vehicle} /> } />
        <Route path="/" element={<Home vehicles={vehicles}/>} />
      </Routes>
    </>
  )
}

export default App
