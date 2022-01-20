import React from 'react'

const Filter = ({ value, filterPerson }) => {

    return (
      <div>filter shown with <input value={value} onChange={filterPerson} /></div>
    )
  }
  
export default Filter