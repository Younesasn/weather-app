import { getWeekDay, getTime } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ time, timezone }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(time, timezone)}, ${getTime(time, timezone)} `}
      </h2>
    </div>
  );
};
