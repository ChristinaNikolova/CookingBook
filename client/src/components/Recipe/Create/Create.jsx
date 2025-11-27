import Button from "../../shared/Button/Button";
import CustomInput from "../../shared/CustomInput/CustomInput";
import styles from "./Create.module.css";

export default function Create() {
  return (
    <section id={styles["create-recipe"]} className="section">
      <h2 className={styles["create-recipe-title"]}>Добави нова рецепта</h2>
      <form className={styles["create-recipe-form"]}>
        <CustomInput label="Заглавие" />
        <div className={styles["create-recipe-input-wrapper"]}>
          <label htmlFor="">Резюме</label>
          <textarea name="" id="" rows={12}></textarea>
        </div>
        <CustomInput label="Инструкции" />
        <CustomInput label="Необходими продукти" />
        <CustomInput label="Качи снимка" type="file" />
        <Button text="Създай рецепта" />
      </form>
    </section>
  );
}
