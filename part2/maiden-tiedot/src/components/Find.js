import React from 'react'


const Find = ({  findCountry, setfindCountry }) => {

    const countryLookUp = (event) => {
        setfindCountry(event.target.value.toLowerCase())
    }
    return (
        <div>find countries: <input value={findCountry} onChange={countryLookUp}></input></div>
    )
}


export default Find