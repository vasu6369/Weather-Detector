import React from "react";

const Forecast = ({ forecast }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const dailyData = {};
  forecast.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(entry);
  });

  console.log(dailyData);
  const summarizedForecast = Object.entries(dailyData).slice(0, 7).map(([date, entries]) => {
    const temps = entries.map(e => e.main.temp);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const midIndex = Math.floor(entries.length / 2);
    const midWeather = entries[midIndex].weather[0];
    return { date, min, max, weather: midWeather };
  });


  return (
    <div>
      <h2 className="mt-3 mb-3 fw-bold">6-Day Forecast</h2>
      <div className="d-flex flex-wrap justify-content-between">
        {summarizedForecast.map((day) => (
          <div key={day.date} className="card text-center p-3 mb-3 mx-2 flex-fill bg-transparent forecast-card" style={{ minWidth: "120px", maxWidth: "150px", cursor: "pointer" }}>
            <div>{formatDate(day.date)}</div>
            <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`} alt={day.weather.main} className="mx-auto d-block" style={{ width: 50, height: 50 }} />
            <div><strong>{Math.round(day.max)}°C</strong> / {Math.round(day.min)}°C</div>
            <div className="text-capitalize">{day.weather.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
