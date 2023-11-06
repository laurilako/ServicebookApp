import React from "react";
import "../Styles/Home.css";
import VehicleCard from "./VehicleCard.jsx";
import { Box, SimpleGrid } from "@chakra-ui/react";

const Home = ({ vehicles }) => {
    return (
        <div className="Home">
            <h1>VEHICLES</h1>
            <SimpleGrid columns={3} spacing={10} padding={'4rem'}>
                {vehicles.map((vehicle) => (
                    <Box key={vehicle.id}>
                        <VehicleCard vehicle={vehicle} />
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    )
}

export default Home;