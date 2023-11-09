import React, { useEffect, useState } from "react";
import "../Styles/VehicleServices.css";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
  } from '@chakra-ui/react'
import { FiInfo } from 'react-icons/fi'
import { GrClose } from "react-icons/gr";  
import axios from "axios";

const VehicleServices = ({ vehicle }) => {

    const [newVehicle, setNewVehicle] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7189/api/Vehicle/licensePlate/${vehicle.licensePlate}`
        ).then((res) => {
            setNewVehicle(res.data.value)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [service, setService] = useState({});

    const handleServiceClick = (service) => {
        setService(service);
        onOpen();
    }

    if(!newVehicle) {
        return (
            <Spinner />
        )
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
                        <h1>Service information</h1>
                        <p>Service name: {service.name}</p>
                        <p>Description: {service.description}</p>
                        <p>Cost: {service.cost}</p>
                        <p>Date: {service.date}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>

            <div className="ServicesContainer">
                <h1>Service history for {newVehicle.licensePlate}</h1>
                <TableContainer className="ServicesTable">
                    <Table variant={"striped"} colorScheme={"blackAlpha"}>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {newVehicle.services && newVehicle.services.map((service) => (
                                <Tr>
                                    <Td>{service.name}</Td>
                                    <Td>
                                        <IconButton
                                            icon={<FiInfo />}
                                            onClick={() => handleServiceClick(service)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default VehicleServices;