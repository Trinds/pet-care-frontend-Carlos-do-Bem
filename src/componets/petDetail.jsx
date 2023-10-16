import {useEffect, useState} from "react";
import {getPetById} from "../services/main/pets.js";

export default function PetDetails({id, backToList}) {
    const [pet, setPet] = useState({})

    useEffect(() => {
            if (id) {
                try {
                    getPetById(id).then((pet) => {
                        setPet((prevPet) => pet)
                    })
                } catch (error) {
                    console.log('Not possible to get pet data.')
                }
            }
        }, []
    )

    return (
        <>
            <button onClick={() => backToList()}>Back To List</button>
            <div>
                <p>Name: {pet.name}</p>
                <p>Breed: {pet.breed}</p>
                <p>Date Of Birth: {pet.dateOfBirth}</p>
            </div>
        </>
    )
}