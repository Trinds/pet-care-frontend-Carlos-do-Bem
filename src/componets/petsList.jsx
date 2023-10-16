import {useEffect, useState} from "react";
import {getAllPets} from "../services/main/pets.js";
import PetDetails from "./petDetail.jsx";

export default function PetsList({setPetForm}) {
    const [petList, setPetList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        //Permitir cancelar um pedido ao servidor
        const abortController = new AbortController();

        try {
            getAllPets().then((data) => {
                setPetList(data)
            })
        } catch (error) {
            setHasError(true)
        } finally {
            setIsLoading(false)
        }

        return () => {
            //Cancelar o pedido caso o componente seja desmontado
            abortController.abort();
        };
    }, [])

    let filteredPetList = petList
    function handleSearchInput(e){
        filteredPetList = petList.filter((pet)=>pet.name.contains(e.target.value))
        return filteredPetList
    }

    return (
        <>
            <input type="search" onChange={(e)=>handleSearchInput(e)}/>
            {isLoading && <h6>Loading...</h6>}
            {hasError && <h6>Something went wrong. Try again later.</h6>}
            <ul>
                {filteredPetList.map((pet,index) => {
                    const {id, name, breed, dateOfBirth} = pet
                    return <li key={index} onClick={()=>PetDetails(id)}>
                        <p>Name: {name}</p>
                        <p>Breed: {breed}</p>
                        <p>Date Of Birth: {dateOfBirth}</p>
                    </li>
                })}
            </ul>
        </>
    )
}