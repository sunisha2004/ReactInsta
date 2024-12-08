import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditData.css";

const EditUserData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    note: "",
  });

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/Login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:3004/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data.data) {
        setFormData({
          name: res.data.data.name || "",
          dob: res.data.data.dob || "",
          note: res.data.data.note || "",
        });
      } else {
        alert("No data found to edit. Redirecting to profile.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Redirecting to profile.");
      navigate("/profile");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
      navigate("Llogin");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:3004/api/edituserData",
        { ...formData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        alert("Data updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update data. Please try again.");
    }
  };

  return (
    <div className="edit-data-page">
      <div className="edit-data-card">
        <h2 className="edit-data-title">Edit Your Details</h2>
        <form className="edit-data-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nickname" className="form-label">
              Nickname
            </label>
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
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
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
            <label htmlFor="note" className="form-label">
              Note
            </label>
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
          <button type="submit" className="btn-submit">
            Update Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserData;
