import React, { useState } from 'react';
import './register.css';
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmpassword: '',
    email:''
  });
formData.email=localStorage.getItem("email")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, password, confirmpassword } = formData;

    // Check for password confirmation match
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log(formData);
      
      const res = await axios.post("http://localhost:3004/api/adduser", formData);
      navigate("/login")

      console.log("Registration successful:");
    } catch (error) {
      console.error("Registration error:");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Create an Account</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;

