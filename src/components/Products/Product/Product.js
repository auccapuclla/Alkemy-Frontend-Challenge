import { Link } from "react-router-dom";
import styles from "./Product.module.css";

const Product = ({ id, title, image }) => {
  return (
    <div className={styles.product}>
      <img className={styles.product__image} src={image} alt="" />

      <div className={styles.product__details}>
        <p className={styles.details__title}>{title}</p>
        <div className={styles.product__buttons}>
          <Link to={`/product/${id}`}>
            <button
              className={`${styles.buttons__btn} ${styles.buttons__view}`}
            >
              View Item
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
