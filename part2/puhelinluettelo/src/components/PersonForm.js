import React from 'react'

const PersonForm = ({ addPerson, nameValue, addNewName, newNumberValue, addNewNumber }) => {

    return (

        <form onSubmit={addPerson}>
            <div>
                name: <input value={nameValue} onChange={addNewName} />
            </div>
            <div>number: <input value={newNumberValue} onChange={addNewNumber} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm