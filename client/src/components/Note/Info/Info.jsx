import { memo } from "react";
import styles from "./Info.module.css";

function Info() {
  return (
    <p className={styles["info-content"]}>
      Бъди винаги организирана и не забравяй нищо!
    </p>
  );
}

export default memo(Info);
