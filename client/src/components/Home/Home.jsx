import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <section id={styles.home}>
      <h1 className={styles["home-title"]}>My CookingBook</h1>
      <ButtonLink path="/recipe/create" text="Добави рецепта" />
    </section>
  );
}
