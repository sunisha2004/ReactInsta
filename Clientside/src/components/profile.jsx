import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css"


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/Login");
    } else {
      try {
        const res = await axios.get("http://localhost:3004/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setUserDetails(res.data.usr);
          setUserData(res.data.data || null);
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error(error);
        location.reload();
        navigate("Login");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* User Details */}
        <div className="profile-header">
          <div className="profile-image">
            <img
              src={userDetails?.profile || "/default-profile.png"}
              alt="Profile"
            />
          </div>
          <h2>{userDetails?.username || "Guest"}</h2>
          <p className="email">{userDetails?.email}</p>
        </div>

        {/* User Data */}
        <div className="profile-body">
          {userData ? (
            <div className="user-details">
              <p>
                <strong>Nickname:</strong> {userData.nickname}
              </p>
              <p>
                <strong>Date of Birth:</strong> {userData.dob}
              </p>
              <p>
                <strong>Note:</strong> {userData.note}
              </p>
              <Link to={"/editUserData"} className="btn btn-primary">
                Edit Profile
              </Link>
            </div>
          ) : (
            <div className="user-details">
              <p>No additional information found.</p>
              <Link to={"/addData"} className="btn btn-secondary">
                Create Profile
              </Link>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="profile-footer">
          <button className="btn btn-danger">Delete Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
