import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "9773c69c66beaa742b6bd7c1fbd9e435";

  const getWeather = async () => {
    if (!city) return;

    try {
      const formattedCity = city.trim().toLowerCase();

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity},IN&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();
      console.log(data); // debug

      if (data.cod === 200 || data.cod === "200") {
        setWeather(data);
        setError("");
      } else {
        setWeather(null);
        setError(data.message); // 🔥 REAL ERROR
      }
    } catch (error) {
      setError("Something went wrong ❌");
    }
  };

  return (
    <div className="container">
      <h1>🌤️ Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p style={{ color: "yellow" }}>⚠️ {error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>☁ Weather: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;