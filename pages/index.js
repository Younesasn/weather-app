import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

const dayjs = require('dayjs');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data");
      const data = await res.json();
      setWeatherData({ ...data });
    };
    getData();
  }, []);

  
  // console.log(now);
  const name = weatherData?.geocoding.results[0].name;
  const country = weatherData?.geocoding.results[0].country;
  const timezone = weatherData?.weather.utc_offset_seconds;
  const sunrise = weatherData?.weather.daily.sunrise[0];
  const sunset = weatherData?.weather.daily.sunset[0];
  
  let currentHour = dayjs.tz(new Date(), weatherData?.weather.timezone).hour();

  const temp = weatherData?.weather.hourly.temperature_2m[currentHour];
  const time = weatherData?.weather.hourly.time[currentHour];
  const humidity = weatherData?.weather.hourly.relative_humidity_2m[currentHour];
  const windSpeed = weatherData?.weather.hourly.wind_speed_10m[currentHour];
  const windDirection = weatherData?.weather.hourly.wind_direction_10m[currentHour];
  const visibility = weatherData?.weather.hourly.visibility[currentHour];
  const icon = weatherData?.weather.hourly.weather_code[currentHour];

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard city={name} country={country} iconName={icon} temp={temp} />
      <ContentBox>
        <Header>
          <DateAndTime time={time} timezone={timezone} />
        </Header>
        <MetricsBox
          humidity={humidity}
          windSpeed={windSpeed}
          windDirection={windDirection}
          timezone={timezone}
          visibility={visibility}
          sunrise={sunrise}
          sunset={sunset}
        />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!"></ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
