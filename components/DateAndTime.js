import { getWeekDay, getTime, getCurrentTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ hour, day, timezone }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(day, timezone)}, ${hour} `}
      </h2>
    </div>
  );
};
