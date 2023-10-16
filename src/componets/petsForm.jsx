import {useEffect, useState} from "react";
import {createOrUpdatePet, getPetById} from "../services/main/pets.js";

export default function PetsForm({id, onPetSubmit, backToList}) {
    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')

    useEffect(() => {
        if (id) {
            try {
                getPetById(id).then((pet) => {
                    setName(pet.name);
                    setBreed(pet.breed);
                    setDateOfBirth(pet.dateOfBirth);
                    console.log(pet.name)
                })
            } catch (error) {
                console.log('Not possible to get pet data.')
            }
        } else {
            setName('');
            setBreed('');
            setDateOfBirth('');
        }
    }, [id]);

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        try {
            createOrUpdatePet({
                name: e.target.petNameInput.value,
                breed: e.target.petBreedInput.value,
                dateOfBirth: e.target.petDobInput.value
            }).then(res => {
                res.status === 201 && (
                    setName(''),
                        setDateOfBirth(''),
                        setBreed('')
                )
            })
        } catch (error) {
            console.log('Not possible to create pet rn, try later.')
        }
        onPetSubmit('')
        backToList()
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input onChange={e => setName(e.target.value)} id="petNameInput" placeholder="Name" type="text"
                   value={name}/>
            <input onChange={e => setBreed(e.target.value)} id="petBreedInput" placeholder="Breed" type="text"
                   value={breed}/>
            <input onChange={e => setDateOfBirth(e.target.value)} id="petDobInput" placeholder="Date of Birth"
                   type="date" value={dateOfBirth}/>
            <button type="submit">Submit</button>
        </form>
    )
}