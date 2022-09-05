import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/all.min.css'
import '../css/main.css'

const Weather = () => {
    const [weather, setWeather]=useState({})
    const [centigrades, setCentigrades]=useState(true)
    const [loading, setLoading] =useState(true)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(success);

        function success(pos) {
            const crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=0b1efb536102488587b6f90273cb390c`).then(res=>{
                setWeather(res.data),
                setLoading(false)
            })
        }

    },[])

    const Change=()=>{
        setCentigrades(!centigrades)
    }

    const Fahrenheit = (Math.floor(weather.main?.temp-273.15)*1.8)+32 

    const centigrad = Math.floor(Math.floor(weather.main?.temp -272.15))
   

    console.log(weather)

    return (
        <div className='weather'>
           {
            loading ? (
                <div className='background'>
                    <p>Wait a moment please</p>
                    <div className='loader'>
                        <i className="fa-solid fa-spinner"></i>
                    </div>
                </div>
            ):(
                <>
                <h1>Weather App</h1>
                <p>{weather.name}, {weather.sys?.country}</p>
                <div className='weather-main'>
                    <div className='weather-left'>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                        <h1>{centigrades ? Fahrenheit: centigrad } {centigrades ? "°F": "°C"}</h1>
                    </div>
                <div className='weather-right'>
                    <ol>
                        <p>"{weather.weather?.[0].description}"</p>
                        <li>Wind Speed: {weather.wind?.speed} m/s</li>
                        <li>Clouds: {weather.clouds?.all} %</li>
                        <li>Pressure: {weather.main?.pressure} mb</li>
                    </ol>
                </div>
            </div>
            <button onClick={Change}>Grados {centigrades ? "°C": "°F"}</button>
                </>
            )
           }
        </div>
    );
};

export default Weather;