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
      weatherData: null
    };
  }

  handleSearch = async (location) => {
    const data = await getWeatherFromApi(location);

    this.setState({
      weatherData: data.list,
      locationData: data.city,
    });
  }

  async componentDidMount() {
    this.handleSearch('Helsinki');
  }

  render() {
    const { weatherData, locationData } = this.state;
    return (
      <div className="root">
        <div className="search-container">
          <SearchBar handleSearch={this.handleSearch} />
        </div>
        <div className="weather-container">
          {
            weatherData && weatherData.map(weather =>
              <WeatherCard key={weather.dt} weatherData={weather} locationData={locationData} />
            )
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
