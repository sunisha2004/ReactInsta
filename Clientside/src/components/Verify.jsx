import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './verify.css'; // Import the CSS file

const Verify = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    // Implement verification logic here
    console.log('Email:', email);
    navigate('/Register'); // Navigate to a success page after verification
  };

  return (
    <div className="verify-container">
      <form className="verify-form" onSubmit={handleVerify}>
        <h2 className="verify-title">Verify Your Email</h2>
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
        <button type="submit" className="verify-button">
          Verify
        </button>
      </form>
    </div>
  );
};

export default Verify;
