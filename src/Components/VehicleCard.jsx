import React from "react";
import "../Styles/VehicleCard.css";
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import { Card, Stack, CardBody, CardFooter, CardHeader, Text, Button, Image } from "@chakra-ui/react";

const VehicleCard = ({ vehicle }) => {

    return (
        <Card className="Card">
            <CardHeader>
                <Text>{vehicle.brand}</Text>
            </CardHeader>
            <CardBody>
                <Stack>
                    <Text>{vehicle.modelName}</Text>
                    <Text>{vehicle.licensePlate}</Text>
                    <Text>{vehicle.year}</Text>
                </Stack>
            </CardBody>
            <CardFooter>
            <ChakraLink as={ReactRouterLink} to={`/vehicle/${vehicle.id}`}>
                <Button className="ServiceButton">SERVICES</Button>
            </ChakraLink>
            </CardFooter>
        </Card>
    )
}

export default VehicleCard;