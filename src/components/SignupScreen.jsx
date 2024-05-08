import React, { useRef } from "react";
import "../style/SignupScreen.scss";
import {

  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        navigate("/home");
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const SignIn = (e) => {
     e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .then((authUser) => {
        navigate("/home");
        // console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="SignupScreen">
      <form className="signupForm">
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button className="signInButton" type="submit" onClick={SignIn}>
          Sign In
        </button>
        <h4>
          <span className="signUpScreen_gray">New to Netflix? </span>

          <span className="signUpScreen_link" onClick={register}>
            Sign Up Now{" "}
          </span>

          <p className="capture">
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot.
          </p>
        </h4>
      </form>
    </div>
  );
};

export default SignupScreen;
