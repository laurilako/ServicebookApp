import React from "react";
import { redirect  } from "react-router-dom";
import "../Styles/VehicleCard.css";
import { Link as ReactRouterLink } from 'react-router-dom'
import { ButtonGroup, Link as ChakraLink } from '@chakra-ui/react'

import { Card, Stack, CardBody, CardFooter, CardHeader, Text, Button, Image, IconButton } from "@chakra-ui/react";
import { FiDelete, FiEdit } from "react-icons/fi";

const VehicleCard = ({ handleEditClick, handleRemoveClick, vehicle }) => {
    return (
        <Card className="Card">
            <div className="CardHeader">
                <ButtonGroup className="ButtonGroup">
                    <IconButton className="EditButton" aria-label="Edit" 
                        icon={<FiEdit />} variant='ghost'
                        onClick={() => handleEditClick(vehicle.id)}>Edit</IconButton>
                    <IconButton className="RemoveButton" aria-label="Remove"
                        icon={<FiDelete />} variant='ghost'
                        onClick={() => handleRemoveClick(vehicle.id)}>Remove</IconButton>
                </ButtonGroup>
                <CardHeader>
                    <Text>{vehicle.brand}</Text>
                </CardHeader>
            </div>
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