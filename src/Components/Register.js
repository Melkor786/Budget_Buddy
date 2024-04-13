import { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLoginButton as Google } from "react-social-login-buttons";
import { BASE_URL } from "../api/env";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { login,signinGoogle } = useGlobalContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const GoogleAuth = useGoogleLogin({ onSuccess: (tokenResponse) =>{
    const accessToken = tokenResponse.access_token;
    signinGoogle(accessToken);
    navigate("/");
  } });
  
  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch(
        `${BASE_URL}users/register`,
        {
          method: "POST",
          body: register_form,
        }
      );

      if (response.ok) {
        await login({ email: formData.email, password: formData.password });
        navigate("/");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Profile Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Google
            text="Continue with Google"
            style={{
              display: "flex",
              justifyContent: "center",
              width: "300px",
              height: "40px",
            }}
            onClick={GoogleAuth}
          />
        </div>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
