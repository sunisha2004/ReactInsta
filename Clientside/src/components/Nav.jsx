import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const profilehandle=()=>{
    navigate('/profile')
  }


  return (
    <nav className="navbar">
      <div className="navbar-logo">My Instagram</div>
      <div className="navbar-profile">
        <span className="navbar-name">Name</span>
        <div className="navbar-image" onClick={handleDropdownToggle}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-img"
          />
        </div>
        {dropdownVisible && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={profilehandle}>
              Profile
            </button>
            <button className="dropdown-item" >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
