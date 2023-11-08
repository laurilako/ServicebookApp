import React, { useState } from "react";
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

const VehicleServices = ({ vehicle }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [service, setService] = useState({});

    const handleServiceClick = (service) => {
        setService(service);
        onOpen();
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
                <h1>Service history for {vehicle.licensePlate}</h1>
                <TableContainer className="ServicesTable">
                    <Table variant={"striped"} colorScheme={"teal"}>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {vehicle.services.map((service) => (
                                <Tr key={service.id}>
                                    <Td>{service.name}</Td>
                                    <Td key={service.id}>
                                        <IconButton aria-label="info" icon={<FiInfo />} variant='ghost'
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