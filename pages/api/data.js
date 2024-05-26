export default async function handler(req, res) {
  
  const getGeocoding = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${process.env.CITY_NAME}&count=1&language=fr&format=json`
  );
  const geocoding = await getGeocoding.json();

  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${geocoding.results[0].latitude}&longitude=${geocoding.results[0].longitude}&hourly=temperature_2m,relative_humidity_2m,visibility,wind_speed_10m,wind_direction_10m,weather_code&daily=sunrise,sunset&timeformat=unixtime&timezone=auto&forecast_days=1`
  );
  const weather = await getWeatherData.json();

  res.status(200).json({
    geocoding: geocoding,
    weather: weather,
  });
}
