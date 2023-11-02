import React from "react";
import "../Styles/Home.css";
import VehicleCard from "./VehicleCard.jsx";
import { Box, SimpleGrid } from "@chakra-ui/react";

const vehicles = [
    {
        id: 1,
        name: "My Car",
        description: "This is my car",
        brand: "Ford",
        type: "Car",
        modelName: "Fusion",
        license: "ABC-123",
    },
    {
        id: 2,
        name: "My Other Car",
        description: "This is my other car",
        brand: "Ford",
        type: "Car",
        modelName: "Fusion",
        license: "XYZ-123",
    },
    {
        id: 3,
        name: "My Other Other Car",
        description: "This is my other other car",
        brand: "Ford",
        type: "Car",
        modelName: "Focus",
        license: "ZZZ-123",
    },
]

const Home = () => {
    return (
        <div className="Home">
            <h1>vehicles</h1>
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