import styles from "./ImagePreview.module.css";

export default function ImagePreview({ name, currentImage }) {
  return (
    <div className={styles["image-preview-wrapper"]}>
      <label>{name}</label>
      <img className={styles["image-preview"]} src={currentImage} alt={name} />
    </div>
  );
}
