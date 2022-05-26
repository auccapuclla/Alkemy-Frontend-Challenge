import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SingleItem.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { add_cart } from "../../store/slices/counter";
import axios from "axios";
import Cart from "../Cart/Cart";

const SingleItem = () => {
  const dispatch = useDispatch();
  const { Carts } = useSelector((state) => state.counter);
  const ID = useParams().id;
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${ID}/information?apiKey=c03cbc60ce094302945018098a8ba55a`
      )
      .then((res) => setItem(res.data));
  }, []);

  const handdleAddCart = () => {
    if (cartCount === 2) {
      console.log(vegCount);
      if (vegCount >= 1) {
        if (item.vegetarian) {
          dispatch(add_cart(item));
          return;
        } else {
          alert(
            `You got ${cartCount} meals but 2 meals should be Vegetarian, you got ${vegCount} top`
          );
          return;
        }
      }
      alert(
        `You got ${cartCount} meals but 2 meals should be Vegetarian, you got ${vegCount} below`
      );
      return;
    }
    dispatch(add_cart(item));
    console.log("Oli");
  };

  const [cartCount, setCartCount] = useState(0);
  const [vegCount, setVegCount] = useState(0);
  useEffect(() => {
    let countItem = 0;
    let countVeg = 0;
    Carts.forEach((dish) => (countItem += dish.qty));
    Carts.forEach((dish) => (dish.vegetarian ? countVeg++ : null));
    setCartCount(countItem);
    setVegCount(countVeg);
  }, [Carts]);

  return (
    <div className={styles.singleItem}>
      {item.length === 0 ? null : (
        <>
          <img className={styles.singleItem__image} src={item.image} alt="" />
          <div className={styles.singleItem__details}>
            <p className={styles.details__title}>{item.title}</p>
            <p className={styles.details__description}>
              {item.summary.replace(/<[^>]+>/g, "")}
            </p>
            <p className={styles.details__price}>
              Vegetarian: {item.vegetarian ? "Yes" : "No"}
            </p>
            <p className={styles.details__price}>{item.readyInMinutes}min</p>
            <button
              className={styles.details__addBtn}
              onClick={handdleAddCart}
              // disabled={cartCount === 4 ? false : true}
            >
              Add To Cart
            </button>
            <Link to={`/`}>
              <button className={styles.details__returnBtn}>Return</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleItem;
