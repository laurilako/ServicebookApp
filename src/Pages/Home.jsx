import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Home.css";
import VehicleCard from "../Components/VehicleCard.jsx";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    Stack,
    IconButton,
    SimpleGrid,
    Box,
    Button,
    useDisclosure,
    useToast,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
  } from '@chakra-ui/react'
import { GrClose } from "react-icons/gr";

const Home = ({ vehicles }) => {
    const [vehiclesArray, setVehiclesArray] = useState([]);

    useEffect(() => {
        setVehiclesArray(vehicles);
    }, [])
    
    const toast = useToast();

    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [modelName, setModelName] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [year, setYear] = useState(0);
    const [color, setColor] = useState('');

    const [licensePlateToRemove, setLicensePlateToRemove] = useState('');


    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        isOpen: isAlertOpen,
        onOpen: onAlertOpen,
        onClose: onAlertClose,
    } = useDisclosure();

    const cancelRef = React.useRef()

    const handleOnClick = () => {
        onOpen();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newVehicle = {
                brand,
                type,
                modelName,
                licensePlate,
                year: Number(year),
                color
            }
            const { data } = await axios.post('https://localhost:7189/api/Vehicle', newVehicle);
            vehiclesArray.push(newVehicle);
            toast({
                title: 'Vehicle added',
                description: 'Vehicle was added successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            onClose();
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred',
                description: err.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleEditClick = (licensePlate) => {
        console.log('edit clicked for id ' + licensePlate);

    }

    const handleRemoveClick = (licensePlate) => {
        setLicensePlateToRemove(licensePlate);
        onAlertOpen();
    }

    const handleRemoveConfirm = async (lic) => {
        console.log('remove confirmed for id ' + lic)
        try {
            const { data } = await axios.delete(`https://localhost:7189/api/Vehicle/${lic}`);
            toast({
                title: 'Vehicle removed',
                description: 'Vehicle was removed successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            // remove vehicle from vehicles array
            setVehiclesArray(vehiclesArray.filter((v) => v.licensePlate !== lic));
            onAlertClose();
        } catch (err) {
            console.log(err);
            toast({
                title: 'An error occurred',
                description: err.response.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        setLicensePlateToRemove('');
    }

    return (
        <>
            <AlertDialog
                isOpen={isAlertOpen}
                onClose={onAlertClose}
                leastDestructiveRef={cancelRef}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">Remove vehicle</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to remove this vehicle? 
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onAlertClose}>Cancel</Button>
                        <Button colorScheme="red" onClick={() => handleRemoveConfirm(licensePlateToRemove)} ml={3}>Remove</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                    {vehiclesArray.map((v) => (
                        <Box key={v.licensePlate}>
                            <VehicleCard vehicle={v} handleEditClick={() => handleEditClick(v.licensePlate)} handleRemoveClick={() => handleRemoveClick(v.licensePlate)} />
                        </Box>
                    ))}
                </SimpleGrid>
            </div>
        </>
    )
}

export default Home;