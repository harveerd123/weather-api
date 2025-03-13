import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import Swal from 'sweetalert2'

const Weather = () => {

    //lets you reference value not needed for rendering
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city) => {
        if(city === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Empty field provided, please provide a city',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else {
                    throw new Error('An error occurred while fetching data.');
                }
            }

            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: allIcons[data.weather[0].icon] || clear_icon
            })
        }   catch (error) {
            console.error('Error fetching weather data:', error);
            if (error.message === 'City not found. Please check the spelling and try again.') {
                Swal.fire({
                    title: 'City Not Found!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            } else {
                Swal.fire({
                    title: 'Error trying to fetch data!',
                    text: 'The API is either down or there was an unknown error.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
    }

    //allows you to perform side effects in components, e.g. fetch data, update DOM
    //this one runs on first render only
    useEffect(() => {
        console.log("useEffect is running");
        search("London");
    },[])



    return (
        <div className='content'>
            <h1>Weather</h1>
        <div className='weather'>
            <h1></h1>
            <div className='search-bar'>
                <input ref={inputRef} type='text' placeholder='Search' />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.windSpeed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Weather