import React from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast
} from '@chakra-ui/react';
import axios from "axios";


const VehicleRemoveDialog = ({ licensePlate, isAlertOpen, onAlertClose, cancelRef }) => {

    console.log(isAlertOpen, onAlertClose, cancelRef)

    const toast = useToast();



    const handleRemoveConfirm = async (licensePlate) => {
        console.log('remove confirmed for id ' + licensePlate);
        try {
            const { data } = await axios.delete(`https://localhost:7189/api/Vehicle/${licensePlate}`);
            toast({
                title: 'Vehicle removed',
                description: 'Vehicle was removed successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
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
    }

    return (
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
                    <Button colorScheme="red" onClick={() => handleRemoveConfirm(licensePlate)} ml={3}>Remove</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VehicleRemoveDialog;