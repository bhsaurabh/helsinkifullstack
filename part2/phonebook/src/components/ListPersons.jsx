import Person from './Person'

const ListPersons = ({ personsToShow }) => {
  return (
    <div>
      <h3>Numbers</h3>
      { personsToShow.map(person => <Person key={person.id} person={person} />) }
    </div>
  )
}

export default ListPersons