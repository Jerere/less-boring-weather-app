const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const dotenv = require('dotenv');
dotenv.config();

const appId = process.env.WEATHER_API_KEY;
const mapURI = process.env.MAP_ENDPOINT || "https://api.openweathermap.org/data/2.5";
//const targetCity = process.env.TARGET_CITY || "aaa";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (targetCity) => {
  // cnt: A number of timestamps returned 
  const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&units=metric&cnt=16`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

router.get('/api/weather/:city', async ctx => {
  const targetCity = ctx.params.city;
  const weatherData = await fetchWeather(targetCity);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
