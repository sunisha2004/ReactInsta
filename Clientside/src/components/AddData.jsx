import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addData.css"


const AddData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3004/api/adduserData",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        alert("Data added successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add data. Please try again.");
    }
  };

  return (
    <div className="add-data-page">
      <div className="add-data-card">
        <h2 className="add-data-title">Add Your Details</h2>
        <form className="add-data-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname" className="form-label">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your nickname"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="note" className="form-label">Note</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a personal note"
              className="form-input"
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn-submit">Add Data</button>
        </form>
      </div>
    </div>
  );
};

export default AddData;
