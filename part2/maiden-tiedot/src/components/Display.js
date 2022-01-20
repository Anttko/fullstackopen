import React from 'react'
import Country from './Country'
import Weather from './Weather'


const Display = ({ findCountry, countries, setfindCountry}) => {

    const filter = findCountry
        ? countries.filter(c => c.name.common.toLowerCase().includes(findCountry))
        : [] // Search result are empty if nothing to search

    if (filter.length === 1) {

        return (
            <div>
                <h1>{filter[0].name.common}</h1>
                <p>Capital city: {filter[0].capital}<br />
                    Population: {filter[0].population}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(filter[0].languages).map(value => <li key={value}>{value}</li>)}
                </ul>
                <img src={filter[0].flags.png} alt='flag' />

                <Weather city={filter[0].capital} />
            </div>
        )
    }
    if (filter.length > 10) {
        return (<div>Too many matches, specify another filter</div>)
    }
    return (
        <ul>
            {filter.map(c =>
                <Country key={c.name.official} name={c.name.common} setfindCountry={setfindCountry} />
            )}
        </ul>
    )
}
export default Display