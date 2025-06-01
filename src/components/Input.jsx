import React from 'react'

export default function Input({ city, setCity, getWeather }) {
  return (
    <div className="input-group mt-4 mb-4 w-50 mx-auto">
      <input type="text" className="form-control" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
      <button className="btn btn-primary" onClick={getWeather}>Get Weather</button>
    </div>
  )
}
