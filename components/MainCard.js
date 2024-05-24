import Image from "next/image";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  temp,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      {/* <Image
        width="300px"
        height="300px"
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      /> */}
      <h1 className={styles.temperature}>
        {temp}°C
      </h1>
    </div>
  );
};
