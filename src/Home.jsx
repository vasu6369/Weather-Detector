import React, { useState } from 'react'
import axios from 'axios';
import Input from './components/Input';
import WeatherCard from './components/WeatherCard';
import './App.css'
import Forecast from './components/Forecast';


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [forecast, setForecast] = useState(null);

  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;



  const getWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError('');

      const { lat, lon } = response.data.coord;
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setForecast(forecastResponse.data.list);


    } catch (err) {
      setWeather(null);
      setForecast(null);
      setError("City not found or API error");
    }
  };



  const getBackgroundClass = () => {
    if (!weather) return 'bg-default';
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear': return 'bg-clear';
      case 'clouds': return 'bg-clouds';
      case 'rain': return 'bg-rain';
      case 'drizzle': return 'bg-drizzle';
      case 'thunderstorm': return 'bg-thunderstorm';
      case 'snow': return 'bg-snow';
      case 'mist':
      case 'haze':
      case 'fog': return 'bg-mist';
      default: return 'bg-default';
    }
  };


  return (
    <div className={` min-vh-100 ${getBackgroundClass()}`}>
      <div className={`pt-4 container text-center min-vh-100 `}>
        <h2 c>🌦️ Weather Detector</h2>

        <Input city={city} setCity={setCity} getWeather={getWeather} />

        {error && <p className="text-danger">{error}</p>}

        {weather && <WeatherCard weather={weather} />}

        {forecast && <Forecast forecast={forecast} />}

      </div>
    </div>
  )
}
