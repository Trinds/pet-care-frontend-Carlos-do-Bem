import {useEffect, useState} from "react"
import {createOrUpdatePet, deletePet, getAllPets, getPetById} from "./services/main/pets"
import PetsList from "./componets/petsList.jsx";
import PetsForm from "./componets/petsForm.jsx";
import PetDetails from "./componets/petDetail.jsx";

function App() {

    const [petsForm, setPetsForm] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [showList, setShowList] = useState(true)
    const [showDetail, setShowDetail] = useState(false)
    const [petId, setPetId] = useState(null)

    function showFormComponent() {
        if (!showForm) {
            setShowDetail(false)
            setShowList(false)
            setShowForm(true)
        }
    }

    function showListComponent() {
        if (!showList) {
            setShowDetail(false)
            setShowList(true)
            setShowForm(false)
        }
    }

    function showDetailComponent() {
        if (!showDetail) {
            setShowDetail(true)
            setShowList(false)
            setShowForm(false)
        }
    }

    return (
        <>
            <h1>Pet Care - Carlos do Bem</h1>
            <button onClick={() => showFormComponent()}>Create Pet</button>
            {showList && <PetsList details={showDetailComponent} setId={setPetId}/>}
            {showForm && <PetsForm pet={petsForm} onPetSubmit={setPetsForm} backToList={showListComponent}/>}
            {showDetail && <PetDetails id={petId} backToList={showListComponent}/>}
        </>
    )
}

export default App
