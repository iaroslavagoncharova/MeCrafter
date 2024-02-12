import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState("signUp"); // Initial mode is sign-up

  const switchToSignUp = () => {
    setAuthMode("signUp");
  };

  const switchToSignIn = () => {
    setAuthMode("signIn");
  };

  const handleSignUpSuccess = () => {
    setAuthMode("signIn");
  };

  return (
    <div className="auth-page container justify-content-center" id="auth-page">
      <div className="auth-switch-buttons-container">
        <div className="auth-switch-buttons btn-group" role="group">
          <button
            onClick={switchToSignUp}
            className={`btn btn-primary ${authMode === "signUp" ? "active" : ""}`}
          >
            Sign Up
          </button>
          <button
            onClick={switchToSignIn}
            className={`btn btn-primary ${authMode === "signIn" ? "active" : ""}`}
          >
            Sign In
          </button>
        </div>
      </div>
      <h2>{authMode === "signUp" ? "Sign Up" : "Sign In"}</h2>
      {authMode === "signUp" ? (
        <SignUp onSuccess={handleSignUpSuccess} />
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default AuthPage;
