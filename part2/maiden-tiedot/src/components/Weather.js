import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Weather = ({ city }) => {
    const api = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
   
    useEffect(() => {
        axios
            .get(weatherUrl) // using openweathermap api
            .then(response => {
                setWeather(

                    {
                        temp: response.data.main.temp,
                        description: response.data.weather[0].description,
                        wind: response.data.wind.speed
                    }
                )
            })
    }, [weatherUrl])

    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>
                <strong>temperature</strong>: {weather.temp} Celcius<br />
                <strong>description</strong>:  {weather.description} <br />
                <br />
                <strong>wind</strong>:  {weather.wind} m/s  <br />
            </p>

        </div>
    )
}


export default Weather