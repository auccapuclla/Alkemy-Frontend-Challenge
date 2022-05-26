import { useDispatch } from "react-redux";
import { remove_from_cart } from "../../../store/slices/counter";
import styles from "./CartItem.module.css";
import trashLogo from "../../../icons/trash_bin.png";

const CartItem = ({ title, id, summary, image, time }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItem__image} src={image} />
      <div className={styles.cartItem__details}>
        <p className={styles.details__title}>{title}</p>
        <p className={styles.details__desc}>
          {summary.replace(/<[^>]+>/g, "")}
        </p>
        <p className={styles.details__price}>{time} min</p>
      </div>
      <div className={styles.cartItem__actions}>
        <button
          className={styles.actions__deleteItemBtn}
          onClick={() => dispatch(remove_from_cart(id))}
        >
          <img src={trashLogo} alt="" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
