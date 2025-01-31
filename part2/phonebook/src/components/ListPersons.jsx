import Person from './Person'
import Button from './Button'
import personsService from '../services/persons'

const handleDelete = (person, persons, setPersons) => {
  // delete person from the DB
  personsService
    .deletePerson(person.id)
    .then(response => {
        // update the state and remove the person from the list
        setPersons(persons.filter(p => p.id !== person.id))
    })
}


const ListPersons = ({ personsToShow, persons, setPersons }) => {
  return (
    <div>
      <h3>Numbers</h3>
      { personsToShow.map(person => 
        <div key={person.id}>
            <Person person={person} />
            <Button handleClick={() => handleDelete(person, persons, setPersons)} text="delete" />
        </div>
      )}
    </div>
  )
}

export default ListPersons