import "./Signin.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googlelogo from "../images/google_logo.png";

// Create a Google Authentication Provider
const provider = new GoogleAuthProvider();

function Signin(props) {
  const [user, setUser] = React.useState("");
  const [signnedIn, setSignnedIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const navigate = useNavigate();

  // Handle Google sign-in
  const GoogleSign = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Access Google Access Token and user information
        console.log("WORKING")
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Google sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const SignnedIn = () => {
      console.log(user)
      setSignnedIn(true);
      setTimeout(() => setSignnedIn(false), 2000);

  }

  return (
    <div>
      <div className="form-container slidefade animate-slidefade z-applicable">
        {errorMessage && (
          <div className="password-error">Error: {errorMessage}</div>
        )}
        <h3 className="title">Sign In</h3>
        <form className="signin-form" action="">
        <div className="google-btn" onClick={user ? SignnedIn : GoogleSign}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src={googlelogo}
              alt="Google Icon"
            />
          </div>
          <p className="btn-text">
            <b>{user.displayName}</b>
          </p>
        </div>
        <p className="siggnedInMessage">{signnedIn ? "User Already Signned In" : ""}</p>

        </form>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default Signin;
