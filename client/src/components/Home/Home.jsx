import useTop from "../../hooks/useTop";
import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./Home.module.css";

export default function Home() {
  useTop();

  return (
    <>
      <section id={styles.home}>
        <div className={styles["home-content-wrapper"]}>
          <h1 className={styles["home-title"]}>My CookingBook</h1>
          <ButtonLink path="/recipe/create" text="Добави рецепта" />
        </div>
      </section>
    </>
  );
}
