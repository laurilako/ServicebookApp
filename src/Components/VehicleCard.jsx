import React from "react";

import { Card, Stack, CardBody, CardFooter, CardHeader, Text, Button, Image } from "@chakra-ui/react";

const VehicleCard = ({ vehicle }) => {
    return (
        <Card>
            <CardHeader>
                <Text>{vehicle.name}</Text>
            </CardHeader>
            <CardBody>
                <Stack>
                    <Text>{vehicle.license}</Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button>Show services</Button>
            </CardFooter>
        </Card>
    )
}

export default VehicleCard;