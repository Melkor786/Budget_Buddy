import React, { useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
import {useGoogleLogin} from '@react-oauth/google';
import {GoogleLoginButton as Google} from "react-social-login-buttons";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login,signinGoogle} = useGlobalContext();
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

  const GoogleAuth = useGoogleLogin({onSuccess: (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    signinGoogle(accessToken);
    navigate("/");
  }});

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
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            textDecorationColor: "white",
          }}
        >
          Use Social Media Credentials
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Google
            text="Continue with Google"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "300px",
              height: "40px",
            }}
            onClick={()=>GoogleAuth()}
          />
        </div>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
