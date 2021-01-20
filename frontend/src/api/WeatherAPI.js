const getWeather = async (cityName) => {
  const API_KEY1 = process.env.REACT_APP_OPENWEATHER;
  const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY1}`);
  const data = await response.json()
  return data;
}


const getLocation = async (destinationCityName) => {
  const API_KEY2 = process.env.REACT_APP_POSITIONSTACK;
  const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY2}&query=${destinationCityName}&limit=1&output=json`);
  const data = await response.json()
  return data;
}


const WeatherAPI = { 
  getWeather,
  getLocation
}


export default WeatherAPI