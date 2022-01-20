import React from 'react'


const Country = ({ name, setfindCountry }) => {

    const showCountry = () => {
        setfindCountry(name.toLowerCase());
    }

    return (<li>{name} <button onClick={showCountry}>show</button></li>)
}



export default Country