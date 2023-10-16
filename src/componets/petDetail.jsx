import {useEffect, useState} from "react";
import {getPetById} from "../services/main/pets.js";

export default function PetDetails({id}){
    let name, breed, dateOfBirth

    useEffect(() => {
        if (id) {
            try {
                getPetById(id).then((pet) => {
                    name=pet.name
                    breed=pet.breed
                    dateOfBirth=pet.dateOfBirth
                    console.log(pet.name)
                })
            } catch (error) {
                console.log('Not possible to get pet data.')
            }
        }
    }, [id]);
    return(
        <>
            <p>Name: {name}</p>
            <p>Breed: {breed}</p>
            <p>Date Of Birth: {dateOfBirth}</p>
        </>
    )
}