import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from './components/Button'
import InputPerson from './components/InputPerson'
import SearchPerson from './components/SearchPerson'
import ListPersons from './components/ListPersons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')  // newName is the state variable that holds the value of the new name input field
  const [newPhone, setNewPhone] = useState('')  // newPhone is the state variable that holds the value of the new phone input field
  const [searchName, setSearchName] = useState('')  // searchName is the state variable that holds the value of the search name input field

  useEffect(() => {
    personsService
      .getAll()
      .then(personsData => {
        setPersons(personsData)
      })
      .catch(error => {
        console.log(error)
        alert('error fetching persons')
      })
  }, [])

  const personsToShow = persons.filter(person => {
    if (searchName === '') {
      return true
    }
    return person.name.toLowerCase().includes(searchName.toLowerCase())
  })

  const handleAddPersonSubmit = (event) => {
    event.preventDefault()  // prevent refreshing the page
    // find if the person already exists
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    const personObject = {
      name: newName,
      phone: newPhone
    }
    personsService
      .create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        console.log(error)
        alert('error adding person')
      })

  }

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* search for a person in the phonebook */}
      <SearchPerson searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      {/* add a person to the phonebook */}
      <form name="addPerson">
        <h3>add a new</h3>
        <div>
          <InputPerson valueName={newName} handleChangeName={handleInputNameChange} valuePhone={newPhone} handleChangePhone={handleInputPhoneChange} />
        </div>
        <div>
          <Button handleClick={handleAddPersonSubmit} text="add" />
        </div>
      </form>
      {/* display the contents of the phonebook */}
      <ListPersons personsToShow={personsToShow} />
    </div>
  )
}

export default App