import React from "react";
import "./Login.css";
// import Button from "@mui/material/Button";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((re) => console.log(re))
      .catch((e) => console.log(e.message));
  };
  return (
    <div className="login">
      <div className="Login__logo">
        <img src="https://cdn-icons-png.flaticon.com/512/3428/3428655.png" />
      </div>
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
