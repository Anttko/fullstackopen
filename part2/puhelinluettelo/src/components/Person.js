import React from 'react'

const Person = ({ person, deleteButton }) => {
    return (
        <li>{person.name} {person.number} <button onClick={() => deleteButton(person.id)} >delete</button></li>
    )
}
export default Person