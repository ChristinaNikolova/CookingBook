import Button from "../../shared/Button/Button";
import styles from "./Create.module.css";

export default function Create() {
  return (
    <section id={styles["create-recipe"]} className="section">
      <h2 className={styles["create-recipe-title"]}>Добави нова рецепта</h2>
      <form className={styles["create-recipe-form"]}>
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Заглавие</label>
          <input type="text" />
        </div>
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Резюме</label>
          <textarea name="" id="" rows={12}></textarea>
        </div>
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Инструкции</label>
          <input type="text" />
        </div>
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Необходими продукти</label>
          <input type="text" />
        </div>
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Качи снимка</label>
          <input type="file" />
        </div>
        <Button text="Създай рецепта" />
      </form>
    </section>
  );
}
