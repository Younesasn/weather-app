import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState();
  const [triggerFetch, setTriggerFetch] = useState();
  
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data");
      const data = await res.json();
      setWeatherData({ ...data });
    };
    getData();
  }, []);

  const name = weatherData?.geocoding.results[0].name;
  const country = weatherData?.geocoding.results[0].country;
  const temp = weatherData?.weather.hourly.temperature_2m[0];
  const time = weatherData?.weather.hourly.time[21];
  const timezone = weatherData?.weather.utc_offset_seconds;
  const humidity = weatherData?.weather.hourly.relative_humidity_2m[0];
  const windSpeed = weatherData?.weather.hourly.wind_speed_10m[0];
  const windDirection = weatherData?.weather.hourly.wind_direction_10m[0];
  const visibility = weatherData?.weather.hourly.visibility[0];
  const sunrise = weatherData?.weather.daily.sunrise[0];
  const sunset = weatherData?.weather.daily.sunset[0];
  const icon = weatherData?.weather.hourly.weather_code[0];

  console.log(time, sunrise, sunset);

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={name}
        country={country}
        iconName={icon}
        temp={temp}
      />
      <ContentBox>
        <Header>
          <DateAndTime time={time} timezone={timezone} />
        </Header>
        <MetricsBox humidity={humidity} windSpeed={windSpeed} windDirection={windDirection} visibility={visibility} sunrise={sunrise} sunset={sunset} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!"></ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
