import useTop from "../../../hooks/useTop";
import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import ButtonLink from "../../shared/ButtonLink/ButtonLink";
import styles from "./Details.module.css";

// todo line through ingredient / step
// todo add no content case

export default function Details({ categoryId }) {
  useTop();

  return (
    <section id={styles.details}>
      <div className={styles["details-top-wrapper"]}>
        <div className="details-top-left-wrapper">
          <div className={styles["details-top-img-wrapper"]}>
            <img
              src="https://www.ciachef.edu/wp-content/uploads/2024/06/Macarons.jpg"
              alt=""
            />
            {/* <i className="fa-solid fa-heart" title="Премахни от любими"></i> */}
            <i className="fa-regular fa-heart" title="Добави в любими"></i>
          </div>
          <ul className={styles["details-top-icon-list"]}>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-users" title="Брой порции"></i> 5
            </li>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-clock" title="Необходимо време"></i> 50
              min
            </li>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-baby" title="Подходящо за бебе"></i> Да
            </li>
            <li className={styles["details-top-icon-item"]}>
              <i className="fa-solid fa-list" title="Категория"></i>
              <Link to={`/recipe/${categoryId}`}>Торти</Link>
            </li>
          </ul>
        </div>

        <div className="details-top-right-wrapper">
          <h2 className={styles["details-top-title"]}>Торта</h2>
          <p className={styles["details-top-summary"]}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore,
            facilis consectetur. Dicta, minus neque corrupti impedit libero in
            optio reiciendis dolore, consequatur nostrum, nulla recusandae quia.
            Consectetur, asperiores inventore! Aspernatur.
          </p>
          <div className={styles["details-top-ingredients-wrapper"]}>
            <h4 className={styles["details-top-ingredients-title"]}>
              Необходими продукти
            </h4>
            <ul className={styles["details-top-ingredients-list"]}>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
              <li className={styles["details-top-ingredients-item"]}>
                Продукт 1 - 120 гр
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles["details-bottom-wrapper"]}>
        <h3 className={styles["details-bottom-title"]}>Стъпки за приготвяне</h3>
        <p className={styles["details-bottom-content"]}>
          <span>Стъпка 1:</span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quia
          nesciunt doloribus a unde, in pariatur alias vero, odit ea facilis.
          Quos odit mollitia vitae sed quaerat ducimus explicabo facilis.
        </p>
        <p className={styles["details-bottom-content"]}>
          <span>Стъпка 2:</span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quia
          nesciunt doloribus a unde, in pariatur alias vero, odit ea facilis.
          Quos odit mollitia vitae sed quaerat ducimus explicabo facilis.
        </p>
        <p className={styles["details-bottom-content"]}>
          <span>Стъпка 3:</span>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non, quia
          nesciunt doloribus a unde, in pariatur alias vero, odit ea facilis.
          Quos odit mollitia vitae sed quaerat ducimus explicabo facilis.
        </p>
      </div>

      <div className={styles["details-buttons-wrapper"]}>
        <ButtonLink path="/edit" text="Редактирай" />
        <Button text="Изтрий" disabled={false} />
      </div>
    </section>
  );
}
