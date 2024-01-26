import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import "../../loginpage.scss";

function Login() {
  return (
    <div className="login-container">
      <div className="side-panel">
        <h2>UNITE</h2>
      </div>
      <div clasName="main-content">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
