import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import Product from "./Product/Product";
import { add_menuSearched } from "../../store/slices/counter";

const Products = () => {
  const [search, setSearch] = useState("");
  const [menu, setMenu] = useState([]);
  const dispatch = useDispatch();
  const { menuSearched } = useSelector((state) => state.counter);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=c03cbc60ce094302945018098a8ba55a`
      )
      .then((data) => setMenu(data.data.results));
  };
  useEffect(() => {
    if (menu.length) {
      dispatch(add_menuSearched(menu));
    }
  }, [menu, dispatch]);

  return (
    <>
      <div className="searchBar">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Search your favorite meal..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          ></input>
        </form>
      </div>
      <div className={styles.products}>
        {menuSearched.length !== 0
          ? menuSearched.map((e) => (
              <Product key={e.id} id={e.id} title={e.title} image={e.image} />
            ))
          : null}
      </div>
    </>
  );
};

export default Products;
