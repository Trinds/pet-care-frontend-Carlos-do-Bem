import {useEffect, useState} from "react"
import {createOrUpdatePet, deletePet, getAllPets, getPetById} from "./services/main/pets"

function App() {
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

    function handleFormSubmit(e) {
        e.preventDefault()

        try {
            createOrUpdatePet({
                name: e.target.querySelector('#petNameInput').value,
                breed: e.target.querySelector('#petBreedInput').value,
                dateOfBirth: e.target.querySelector('#petDobInput').value
            })
        } catch (error) {
            console.log('Not possible to create pet rn, try later.')
        }
    }

    return (
        <>
            <h1>Pet Care - Carlos do Bem</h1>
            <button onClick={() => showCreatePetForm}>Create Pet</button>
            {isLoading && <h6>Loading...</h6>}
            {hasError && <h6>Something went wrong. Try again later.</h6>}
            <ul>
                {petList.map((pet) => {
                    const {id, name, breed, dateOfBirth} = pet
                    return <li key={id}>
                        <p>Name: {name}</p>
                        <p>Breed: {breed}</p>
                        <p>Date Of Birth: {dateOfBirth}</p>
                    </li>
                })}
            </ul>

            <form onSubmit={() => handleFormSubmit(event)}>
                <input id="petNameInput" placeholder="Name" type="text" defaultValue=""/>
                <input id="petBreedInput" placeholder="Breed" type="text" defaultValue=""/>
                <input id="petDobInput" placeholder="Date of Birth" type="date" defaultValue=""/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default App
