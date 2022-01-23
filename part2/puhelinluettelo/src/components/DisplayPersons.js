import React from 'react'
import Person from './Person'

const DisplayPersons = ({ persons, filter, deleteButton }) => {

  if (persons.length === 0) {
    return (<div>Contact list is empty!</div>)
  }

  const showContacts = filter
    ? persons.filter(p => p.name.toLowerCase().includes(filter))
    : persons



  return (
    <ul >{showContacts.map(person =>
      <Person key={person.id} person={person} deleteButton={deleteButton} />
    )}</ul>
  )
}

export default DisplayPersons