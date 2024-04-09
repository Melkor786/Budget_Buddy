import React, { useEffect, useState } from "react";
import "../styles/Login.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useGlobalContext(); 
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(`ye hai user: ${user}`);
    // console.log(` ye authentication wala console log hai: ${isAuthenticated()}`);
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password }); 
      navigate("/");
    } catch (err) {
      console.log("Login failed : ", err.message);
    }
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
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
