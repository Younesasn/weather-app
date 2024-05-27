import {
  Clock,
  unixToLocalTime, unixToTime,
} from "./converters";

export const getVisibility = (visibilityInMeters) =>
  (visibilityInMeters / 1000).toFixed(1);

export const getTime = (time, timezone) => unixToLocalTime(time, timezone);

export const getCurrentTime = (time) => Clock(time);

export const getWeekDay = (time, timezone) => {
  const weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return weekday[new Date((time + timezone) * 1000).getUTCDay()];
};
