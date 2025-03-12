import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {jwtDecode} from "jwt-decode"; // Importing jwt-decode properly
import image from "../Util/images/Rectangle 77.png";
import Logo from "../Util/Logo";

axios.defaults.withCredentials = true; // Ensures cookies are sent with requests

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle user logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const LoginUrl = new URL("/login", process.env.REACT_APP_BACKEND_URL).toString();

      const response = await axios.post(LoginUrl, formData);

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  // Check token expiration and logout if expired
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (decodedToken.exp < currentTime) {
        handleLogout(); // Logout when token expires
      }
    }
  }, [handleLogout]); // Adding handleLogout to the dependency array

  return (
    <div className="auth-container">
      <Logo />
      <div className="register-container">
        <div className="register-left-section">
          <div className="register-left">
            <img src={image} alt="register" />
          </div>
        </div>
        <div className="register-right-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Welcome to Dashboard</h3>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* ✅ Added proper navigation links */}
            <p>
              <Link to="/forgot-password">
                <small className="text-light">Forgot password? </small>
              </Link>
            </p>

            <button className="btn btn-register" type="submit">
              Login
            </button>

            <p>
              <small className="text-light">
                Don't have an account? <Link to="/">Register</Link>
              </small>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Toast Messages */}
      <ToastContainer />
    </div>
  );
};

export default Login;
