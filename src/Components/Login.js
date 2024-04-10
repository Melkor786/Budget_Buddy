import React, { useEffect, useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
} from "react-social-login-buttons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      console.log("Login failed : ", err.message);
    }
  };
  const handleClick = () => {
    alert("React Social Login Buttons!");
  };
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <div>
          {"or"}
          <GoogleLoginButton onClick={handleClick}/>
          {/*<FacebookLoginButton onClick={handleClick}/>
          <GithubLoginButton onClick={handleClick}/>*/}
        </div>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
