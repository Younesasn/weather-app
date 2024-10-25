import { useEffect, useState } from "react";
import { getWeekDay } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ hour, day, timezone }) => {

  const [currentTime, setCurrentTime] = useState(hour);

  useEffect(() => {
    const update = setInterval(() => {
      setCurrentTime(hour);
    }, 1000);
    return () => clearInterval(update);
  }, [hour]);
  
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(day, timezone)}, ${currentTime}`}
      </h2>
    </div>
  );
};
