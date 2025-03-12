import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../Util/images/Rectangle 77.png";
import "./Register.css"; 
import Logo from "../Util/Logo";

const Register = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password validation function
  const isValidPassword = (password) => {
    const minLength = /.{8,}/; // At least 8 characters
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character
    return minLength.test(password) && specialChar.test(password);
  };

  // Handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match with confirm password
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Check if password is 8 character and must contain a special symbol
    if (!isValidPassword(formData.password)) {
      toast.error("Password must be at least 8 characters and contain a special symbol!");
      return;
    }

    try {
      // Send data to backend
      const response = await axios.post("http://localhost:8080/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
console.log(response)
      //  Success message if registration is successful
      toast.success("Registration successful! Redirecting...");

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
      
    } catch (error) {
      // Error Handling and display error message
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <Logo />
      <div className="register-container">
        <div className="register-left-section">
          <div className="register-left">
            <img src={image} alt="register" />
            <div className="register-left-section-text">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='center'>lorem ipsum dolor sit</p><br />
              <article className='last'>
                <p>Consectetur adipisicing elit. Ipsam aut et nam minus totam...</p>
              </article>
            </div>
          </div>
        </div>

        <div className="register-right-section"> 
          <form className="register-form" onSubmit={handleSubmit}>
            <h3>Welcome to Dashboard</h3>

            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

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

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button className="btn btn-register" type="submit">Register</button><br />
            <p><span className="text-light"><small>Already have an account ? <a href="/login">Login</a></small></span></p>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
