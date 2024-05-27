import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import styles from "../styles/Home.module.css";

const dayjs = require("dayjs");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const App = () => {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data");
      const data = await res.json();
      setWeatherData({ ...data });
    };
    getData();
    const interval = setInterval(getData, 3600000);
    return () => clearInterval(interval);
  }, []);

  const name = weatherData?.geocoding.results[0].name;
  const country = weatherData?.geocoding.results[0].country;
  const timezone = weatherData?.weather.utc_offset_seconds;
  const sunrise = weatherData?.weather.daily.sunrise[0];
  const sunset = weatherData?.weather.daily.sunset[0];

  const hour = dayjs.tz(new Date(), weatherData?.weather.timezone).hour();

  const currentHour = dayjs
    .tz(new Date(), weatherData?.weather.timezone)
    .format("HH:mm");

  const temp = weatherData?.weather.hourly.temperature_2m[hour];
  const day = weatherData?.weather.hourly.time[hour];
  const humidity = weatherData?.weather.hourly.relative_humidity_2m[hour];
  const windSpeed = weatherData?.weather.hourly.wind_speed_10m[hour];
  const windDirection = weatherData?.weather.hourly.wind_direction_10m[hour];
  const visibility = weatherData?.weather.hourly.visibility[hour];
  const icon = weatherData?.weather.hourly.weather_code[hour];

  return weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard city={name} country={country} icon={icon} temp={temp} />
      <ContentBox>
        <Header>
          <DateAndTime day={day} hour={currentHour} timezone={timezone} />
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
    <ErrorScreen errorMessage="Une erreur est survenue"></ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Chargement des données..." />
  );
};

export default App;
