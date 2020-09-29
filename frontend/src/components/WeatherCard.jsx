import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = ({ weatherData, locationData }) => {
  const weather = {
    temperature: Math.round(weatherData.main.temp),
    wind: Math.round(weatherData.wind.speed),
    description: weatherData.weather[0].description,
    icon: weatherData.weather[0].icon.slice(0, -1),
    date: ` ${new Date(weatherData.dt * 1000).getHours()}:00`,
    location: `${locationData.name}, ${locationData.country}`,
  };

  return (
    <div className="weather-card">
      <p>{weather.location + weather.date}</p>
      <img alt="icon" className="weather-icon" src={`/img/${weather.icon}.svg`} />
      <h3>{weather.temperature}°C </h3>
      <div className="wind-container">
        <img alt="icon" className="wind-icon" src="/img/wind.svg" />
        <p> {weather.wind} m/s</p>
      </div>
      <p>{weather.description}</p>
    </div>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.oneOfType([PropTypes.object]),
  locationData: PropTypes.oneOfType([PropTypes.object]),
};

WeatherCard.defaultProps = {
  weatherData: undefined,
  locationData: undefined,
};

export default WeatherCard;
