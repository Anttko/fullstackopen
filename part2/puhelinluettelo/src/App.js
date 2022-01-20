import React, { useState, useEffect } from 'react'
import axios from 'axios'


import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilterPersons] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addNewName = (event) => {
    console.log('person', event.target.value)
    setNewName(event.target.value);
  }
  const addNewNumber = (event) => {
    console.log('number', event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    console.log('person', persons)
    console.log(newName)
    console.log('inc', persons.includes(newName))
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(({ name }) => name === personObject.name)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    console.log('person', persons)
  }

  const filterPerson = (event) => {
    setNewFilter(event.target.value)

    const personResults = persons.filter((person) => {
      return (
        person.name
          .toString()
          .toLowerCase()
          .indexOf(newFilter.toLowerCase()) > -1
      )
    })
    setFilterPersons(personResults)
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={newFilter} filterPerson={filterPerson} />

      <h2>Add new</h2>

      <PersonForm addPerson={addPerson} nameValue={newName} addNewName={addNewName} newNumberValue={newNumber} addNewNumber={addNewNumber} />

      <h2>Numbers</h2>

      <DisplayPersons persons={persons} filteredPerson={filteredPersons} filter={newFilter} />

    </div>
  )
}

export default App