import React from "react";

const weatherIcons = {
  Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  Drizzle: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
  Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  Mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  Haze: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  Fog: "https://cdn-icons-png.flaticon.com/512/1779/1779940.png",
  Tornado: "https://cdn-icons-png.flaticon.com/512/1779/1779947.png",
  Default: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
};

function WeatherCard({ weather }) {
  const condition = weather.weather[0].main;
  const icon = weatherIcons[condition] || weatherIcons.Default;
  const description = weather.weather[0].description;
  const capitalizedDescription =description.charAt(0).toUpperCase() + description.slice(1);

  return (
    <div className="card weather-card mx-auto mt-4 text-center text-white p-4 rounded-4 shadow-lg" style={{ maxWidth: "700px", backgroundColor: "rgba(255,255,255,0.15)" }}>
      <h2 className="mb-3">{weather.name}</h2>
      <img src={icon} alt={condition} className="mb-3 mx-auto d-block" style={{ width: "120px", height: "120px" }} />
      <h3 className="display-4 mb-3">{Math.round(weather.main.temp)}°C</h3>
      <p className="fs-5 mb-3">{capitalizedDescription}</p>
      <div className="d-flex justify-content-around fs-5">
        <div>🌡 <strong>Feels Like:</strong> {Math.round(weather.main.feels_like)}°C</div>
        <div>💧 <strong>Humidity:</strong> {weather.main.humidity}%</div>
        <div>💨 <strong>Wind:</strong> {weather.wind.speed} m/s</div>
      </div>
    </div>
  );
}

export default WeatherCard;
