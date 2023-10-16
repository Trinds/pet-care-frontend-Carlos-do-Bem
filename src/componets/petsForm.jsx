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
        <>
            <button onClick={()=>backToList()}>Back To List</button>
            <form  onSubmit={handleFormSubmit}>
                <input className="form-control" onChange={e => setName(e.target.value)} id="petNameInput" placeholder="Name" type="text"
                       value={name}/>
                <input className="form-control" onChange={e => setBreed(e.target.value)} id="petBreedInput" placeholder="Breed" type="text"
                       value={breed}/>
                <input className="form-control" onChange={e => setDateOfBirth(e.target.value)} id="petDobInput" placeholder="Date of Birth"
                       type="date" value={dateOfBirth}/>
                <button type="submit">Submit</button>
            </form>
        </>

    )
}