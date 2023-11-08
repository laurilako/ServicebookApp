/*tslint:disabled*/
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";
import VehicleCard from "./VehicleCard.jsx";
import {
    SimpleGrid,
    Box,
    IconButton,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    Input,
    Stack,
    FormControl,
    FormLabel
  } from '@chakra-ui/react'
  import { GrClose } from "react-icons/gr";  

const Home = ({ vehicles }) => {
    
    useEffect(() => {
        fetch('https://localhost:7189/api/Vehicle')
            .then((res) => res.json())
            .then((data) => vehicles = data)
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOnClick = () => {
        onOpen();
    }

    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [modelName, setModelName] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // TODO, KUN LISÄTÄÄN AJONEUVO, MUUTA API PALAUTTAMAAN LISÄTTY AJONEUVO JA LISÄÄ SE VEHICLES ARRAYYN!!!
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newVehicle = { brand, type, modelName, licensePlate, year, color };
            await fetch('https://localhost:7189/api/Vehicle', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVehicle)
            });
            setIsLoading(false);
            onClose();
            vehicles.push(newVehicle);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setBrand('');
            setType('');
            setModel('');
            setLicensePlate('');
            setYear('');
            setColor('');
        }

        console.log(vehicles)
    }

    const handleEditClick = async (id) => {
        console.log('edit clicked for id ' + id);
    }

    const handleRemoveClick = async (id) => {
        console.log('remove clicked for id ' + id)
        try {
            await fetch(`https://localhost:7189/api/Vehicle/${id}`, {
                method: 'DELETE'
            });
            // delete vehicle also from vehicles array
            const newVehicles = vehicles.filter(vehicle => vehicle.id !== id);
            // update vehicles array
            vehicles = newVehicles;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'} padding={'5'}>
                    <ModalFooter mb='-5' mt='-5' mr='-6' justifyContent={'right'}>
                        <IconButton icon={<GrClose />} bgColor={''} size={'sm'} onClick={onClose}>
                        </IconButton>
                    </ModalFooter>
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <Stack>
                                    <h1>Add new vehicle</h1>
                                    <FormLabel>Brand</FormLabel>
                                    <Input type="text" placeholder="Brand" onChange={e => setBrand(e.currentTarget.value)}/>
                                    <FormLabel>Vehicle type</FormLabel>
                                    <Input type="text" placeholder="Car, Motorcycle..." onChange={e => setType(e.currentTarget.value)}/>
                                    <FormLabel>Vehicle model</FormLabel>
                                    <Input type="text" placeholder="Model" onChange={e => setModelName(e.currentTarget.value)}/>
                                    <FormLabel>License plate</FormLabel>
                                    <Input type="text" placeholder="License plate" onChange={e => setLicensePlate(e.currentTarget.value)}/>
                                    <FormLabel>Vehicle year</FormLabel>
                                    <Input type="number" placeholder="Year" onChange={e => setYear(e.currentTarget.value)}/>
                                    <FormLabel>Vehicle color</FormLabel>
                                    <Input type="text" placeholder="Color" onChange={e => setColor(e.currentTarget.value)}/>
                                </Stack>
                            </FormControl>
                            <Button type="submit" colorScheme="teal" size="md" mt="4">
                                Add
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <div className="Home">
                <h1>VEHICLES</h1>
                <Button className="AddButton" onClick={() => handleOnClick()}>
                    ADD VEHICLE
                </Button>
                <SimpleGrid columns={3} spacing={10} padding={'4rem'}>
                    {vehicles.map((vehicle) => (
                        <Box key={vehicle.id}>
                            <VehicleCard vehicle={vehicle} handleEditClick={() => handleEditClick(vehicle.id)} handleRemoveClick={() => handleRemoveClick(vehicle.id)} />
                        </Box>
                    ))}
                </SimpleGrid>
            </div>
        </>
    )
}

export default Home;