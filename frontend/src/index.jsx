import React from 'react';
import ReactDOM from 'react-dom';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (location) => {
  try {
    const response = await fetch(`${baseURL}/weather/${location}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: null,
    };
  }

  async componentDidMount() {
    this.handleSearch('Helsinki');
  }

  handleSearch = async (location) => {
    const data = await getWeatherFromApi(location);

    this.setState({
      weatherData: data.list,
      locationData: data.city,
      statusCode: data.cod,
      message: data.message,
    });
  }

  render() {
    const {
      weatherData,
      locationData,
      statusCode,
      message,
    } = this.state;

    return (
      <div className="root">
        <div className="search-container">
          <SearchBar handleSearch={this.handleSearch} />
        </div>
        <div className="error-container">
          {
            statusCode === '404' && <h1>{message}</h1>
          }
        </div>
        <div className="weather-container">
          {
            weatherData && weatherData.map((weather) => (
              <WeatherCard
                key={weather.dt}
                weatherData={weather}
                locationData={locationData}
              />
            ))
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
