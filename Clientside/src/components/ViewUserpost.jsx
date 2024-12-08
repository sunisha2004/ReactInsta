import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewUserpost.css";

const ViewUserPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem("token");

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3004/api/getPost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPost(res.data.post);
      } else {
        alert("Failed to fetch post data.");
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      navigate("/profile");
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:3004/api/deletePost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        alert(res.data.msg);
        navigate("/profile");
      } else {
        alert("Failed to delete post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Try again.");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="view-post-container">
      <h2 className="post-title">Post Details</h2>
      <div className="post-details">
        <div className="post-images">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="post-img"
            />
          ))}
        </div>
        <div className="post-info">
          <h3 className="post-caption">{post.caption}</h3>
          <p className="post-description">{post.description}</p>
          <p className="post-date-time">
            <strong>Date:</strong> {post.date} <br />
            <strong>Time:</strong> {post.time}
          </p>
        </div>
      </div>
      <div className="post-actions">
        <button
          className="action-button edit-button"
          onClick={() => navigate(`/editPost/${id}`)}
        >
          Edit
        </button>
        <button className="action-button delete-button" onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewUserPost;
