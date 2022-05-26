import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import cartLogo from "../../icons/cart.png";
import clockLogo from "../../icons/clock.png";

const Navbar = () => {
  const { Carts } = useSelector((state) => state.counter);

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let countItem = 0;
    Carts.forEach((dish) => (countItem += dish.qty));
    setCartCount(countItem);
  }, [Carts, cartCount]);

  const [cartTime, setCartTime] = useState(0);
  useEffect(() => {
    let countTime = 0;
    Carts.forEach((cart) => {
      countTime += cart.readyInMinutes;
    });
    setCartTime(countTime);
  }, [Carts, cartTime]);

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <h2 className={styles.navbar__logo}>Hotel Menu</h2>
      </Link>
      <div className={styles.cart__time}>
        <Link to="/cart">
          <div className={styles.navbar__cart}>
            <h3 className={styles.cart__title}>Time</h3>
            <img className={styles.cart__image} src={clockLogo} alt="Clock" />
            <div className={styles.cart__counter}>{cartTime}</div>
          </div>
        </Link>
        <Link to="/cart">
          <div className={styles.navbar__cart}>
            <h3 className={styles.cart__title}>Cart</h3>
            <img
              className={styles.cart__image}
              src={cartLogo}
              alt="Shop Cart"
            />
            <div className={styles.cart__counter}>{cartCount}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
