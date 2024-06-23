import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'add your key here';
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        const response = await axios.get(url);
        setWeather(response.data.current);
        setError(null); // Reset error state on successful fetch
      } catch (err) {
        setWeather(null); // Clear weather state if an error occurs
        setError('City not found'); // Set error message
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
      <h1 className="text-3xl text-white font-bold mb-4">Weather App</h1>
      <input
        className="form-input w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
      />
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        onClick={() => setCity(city)}
      >
        Get Weather
      </button>
      {error ? (
        <p className="text-red-500 mt-5">{error}</p>
      ) : weather ? (
        <div className="mt-5 text-white">
          <h2 className="text-2xl font-semibold">Weather in {city}</h2>
          <p>Temperature: {weather.temp_c} °C</p>
          <p>Condition: {weather.condition.text}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.wind_kph} km/h</p>
        </div>
      ) : (
        <p className="text-white">Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherApp;
