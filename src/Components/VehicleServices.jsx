import React from "react";

const VehicleServices = ({ vehicle }) => {

    return (
        <div className="VehicleServices">
            <h1>Vehicle Services</h1>
            <h2>{vehicle.brand}</h2>
            <h2>{vehicle.modelName}</h2>
            <h2>{vehicle.licensePlate}</h2>
            <h2>{vehicle.year}</h2>
            <ul>
                {vehicle.services.map((service) => (
                    <li key={service.id}>
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VehicleServices;