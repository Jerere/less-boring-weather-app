import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather/Helsinki`);
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
      icon: '',
      desc: '',
    };
  }

  async componentDidMount() {
    const data = await getWeatherFromApi();
    this.setState({
      icon: data.list[0].weather[0].icon.slice(0, -1),
      desc: data.list[0].weather[0].description,
      temp: data.list[0].main.temp,
    });
  }

  render() {
    const { icon, desc, temp } = this.state;

    return (
      <div className="icon" style={{ textAlign: 'center', fontFamily: 'arial' }}>
        { icon && <img alt={desc} src={`/img/${icon}.svg`} />}
        { desc && <h1>{temp}°C  </h1>}
        { temp && <h2>{desc}</h2>}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
