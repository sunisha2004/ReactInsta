import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    console.log('Name:', name, 'Email:', email, 'Password:', password);
    navigate('/');
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
