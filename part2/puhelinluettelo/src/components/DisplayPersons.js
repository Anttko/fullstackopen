import React from 'react'
import Person from './Person'

const DisplayPersons = ({ persons, filteredPerson, filter }) => {
    let array = {}
  
    if (filter === '') {
      array = persons;
    }
    else {
      array = filteredPerson;
    }
  
    return (
      <ul>{array.map(person =>
        <Person key={person.name} person={person} />
      )}</ul>
    )
  }
  
  export default DisplayPersons