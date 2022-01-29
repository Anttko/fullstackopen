import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayPersons from './components/DisplayPersons'
import ErrorMessage from './components/ErrorMessage'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
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
    event.preventDefault()
    console.log('person', persons)
    console.log(newName)
    console.log('inc', persons.includes(newName))
    let finder = persons.filter(p => p.name === newName)



    if (finder.length >= 1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(finder[0].id, { ...finder[0], number: newNumber })
          .then(response => {
            setPersons(persons.map(p => p.id !== finder[0].id ? p : response))
          })
        setNewName('')
        setNewNumber('')
        setErrorState(false)
        setErrorMessage(
          `User: '${finder[0].name}' updated succesfully`
        )
        setTimeout(() => {
          setErrorMessage(null)
          setErrorState(true)
        }, 5000)

      }
    } else {
      const personObject = {
        /*id: persons.length + 1 + Math.round(Math.random() * 99999),*/
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNewName('')
          setNewNumber('')
        }).catch(error => {

          if (error.response.data) {
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
          console.log(error.response.data)
          setErrorMessage(
            `User was '${finder[0].name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.filter(p => p.id !== finder[0].id))
        })
    }

    console.log('person', persons)
  }

  const filterPerson = (event) => {
    setNewFilter(event.target.value)

  }

  const deleteButton = id => {
    console.log('id:', id)
    let finder = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${finder}`)) {
      personService
        .rm(id).then(() => {
          setPersons(persons.filter(p => p.id !== id))
        }
        ).catch(error => {
          console.log('delete error', error)
          setErrorMessage(
            `User was '${finder}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} errorState={errorState} />
      <Filter value={newFilter} filterPerson={filterPerson} />

      <h2>Add new</h2>

      <PersonForm addPerson={addPerson} nameValue={newName} addNewName={addNewName} newNumberValue={newNumber} addNewNumber={addNewNumber} />

      <h2>Numbers</h2>

      <DisplayPersons persons={persons} filter={newFilter} deleteButton={deleteButton} />

    </div>
  )
}

export default App