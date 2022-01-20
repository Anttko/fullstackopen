import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Find from './components/Find'
import Display from './components/Display'

const App = () => {

  const [countries, setCountries] = useState([])
  const [findCountry, setfindCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  return (
    <div>
      <div>
        <Find
          countries={countries}
          findCountry={findCountry}
          setfindCountry={setfindCountry}
        />
      </div>

      <div>
        <Display
          countries={countries}
          findCountry={findCountry}
          setfindCountry={setfindCountry}
          
        />
      </div>

    </div>

  )




}

export default App



