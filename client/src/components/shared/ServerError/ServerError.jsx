import { useEffect, useState } from "react";
import styles from "./ServerError.module.css";

export default function ServerError({ error, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const visibleTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 500);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(fadeTimer);
    };
  }, [duration]);

  if (!isVisible) {
    return null;
  }

  return (
    <section
      id={styles["server-error"]}
      className={isFading ? styles["fade-out"] : styles["fade-in"]}
    >
      <p className="error">{error}</p>
    </section>
  );
}
