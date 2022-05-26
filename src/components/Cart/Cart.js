import React from "react";
import styles from "./Cart.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";

const Cart = () => {
  const carts = useSelector((state) => state.counter.Carts);

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let countItem = 0;
    carts.forEach((dish) => (countItem += dish.qty));
    setCartCount(countItem);
  }, [carts, cartCount]);

  const [cartTime, setCartTime] = useState(0);
  useEffect(() => {
    let countTime = 0;
    carts.forEach((cart) => {
      countTime += cart.readyInMinutes;
    });
    setCartTime(countTime);
  }, [carts, cartTime]);

  return (
    <div className={styles.cart}>
      <div className={styles.cart__items}>
        {carts.length
          ? carts.map((cart) => (
              <CartItem
                key={cart.id}
                id={cart.id}
                title={cart.title}
                image={cart.image}
                summary={cart.summary}
                time={cart.readyInMinutes}
              />
            ))
          : null}
      </div>
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Menu Summary</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({cartCount} items)</span>
          <span>{cartTime} min</span>
        </div>
        <button className={styles.summary__checkoutBtn}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
