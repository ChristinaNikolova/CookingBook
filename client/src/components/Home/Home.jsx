import useAuthContext from "../../hooks/useAuthContext";
import useTop from "../../hooks/useTop";
import { getTranslations } from "../../utils/i18n";
import LastThree from "../Recipe/LastThree/LastThree";
import ButtonLink from "../shared/ButtonLink/ButtonLink";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuthenticated } = useAuthContext();
  const t = getTranslations();
  useTop();

  return (
    <>
      <section id={styles.home}>
        <div className={styles["home-content-wrapper"]}>
          <h1 className={styles["home-title"]}>My CookingBook</h1>
          <ButtonLink path="/recipe/create" text={t.addRecipe} />
        </div>
      </section>
      {isAuthenticated && <LastThree />}
    </>
  );
}
