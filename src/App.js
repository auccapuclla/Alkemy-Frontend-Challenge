import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./store/slices/user/userSlice";
import "./App.css";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import SingleItem from "./components/SingleItem/SingleItem";
import Cart from "./components/Cart/Cart";
import Login from "./components/Login/Login";
import { auth } from "./firebase";
import { login, logout } from "./store/slices/user/userSlice";
import { useEffect } from "react";
function App() {
  const user = useSelector(selectUser);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is ", authUser);
      if (authUser) {
        //user logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        //user logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <div className="app">
        {user ? (
          <>
            <Navbar />
            <Switch>
              <Route exact path="/" element={<Products />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/product/:id" element={<SingleItem />} />
            </Switch>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
