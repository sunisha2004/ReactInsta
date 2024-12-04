import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    password: '',
    email:''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    
try {
  console.log(formData);
  
  const res=await axios.post("http://localhost:3004/api/login",formData)

  if (res.status==201) {
    // console.log(res);
    // console.log(formData);
    console.log(res.data.token);
    localStorage.setItem("token",res.data.token)
    alert("login success")
    navigate("/")
    
    
  }
} catch (error) {
  
}    
    // navigate('/');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleCreateAccount = () => {
    navigate('/Verify');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Sign In</h2>
      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
          name='email'
            value={formData.email}
            onChange= {handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name='password'
            value={formData.password}
            onChange= {handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Sign In
        </button>
        <div className="login-options">
          <button
            type="button"
            className="link-button"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
          <button
            type="button"
            className="link-button"
            onClick={handleCreateAccount}
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
