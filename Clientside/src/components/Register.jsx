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
    pic:'',
    email:localStorage.getItem('email') || "",
  });
  const [previewImage, setPreviewImage] = useState(null);
formData.email=localStorage.getItem("email")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pic: reader.result }); // Save Base64 string
        setPreviewImage(reader.result); // Set preview image
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
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

      if(res.status==201){
        alert(res.data.msg)
        localStorage.removeItem('email')
      navigate("/Login")
      }
      else{
        alert(res.data.msg)
      }

      // console.log("Registration successful:");
    } catch (error) {
      console.error("Registration error:");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Create an Account</h2>
        <br />
        <div className="form-group">
            {previewImage && (
              <img
                src={previewImage}
                alt="Profile Preview"
                style={{ marginTop: "10px", width: "100px", height: "100px", borderRadius: "50%" }}
              />
            )}
            <label>Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
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

