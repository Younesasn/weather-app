import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  temp,
  icon,
}) => {
  const tempRound = Math.round(temp);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <Image
        width="300px"
        height="300px"
        src={`/icons/${icon}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {tempRound}°C
      </h1>
    </div>
  );
};
