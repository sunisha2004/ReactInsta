import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Viewpost.css";

const ViewPost = () => {
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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <div className="loading">Loading...</div>;

  return (
    <div className="view-post">
      <header className="post-header">
        <h1 className="post-title">Post Details</h1>
      </header>
      <section className="post-content">
        <div className="images-section">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="post-image"
            />
          ))}
        </div>
        <div className="info-section">
          <h2 className="caption">{post.caption}</h2>
          <p className="description">{post.description}</p>
          <div className="meta-data">
            <p>
              <strong>Date:</strong> {post.date}
            </p>
            <p>
              <strong>Time:</strong> {post.time}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewPost;
