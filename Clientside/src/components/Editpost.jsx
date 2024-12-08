import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Editpost.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const token = localStorage.getItem("token");

  const getPostDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3004/api/getPost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setPost(res.data.post);
        setCaption(res.data.post.caption);
        setDescription(res.data.post.description);
        setImages(res.data.post.images || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your form submission logic here
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <div className="edit-post-wrapper">
      <div className="edit-post-card">
        <h2>Edit Your Post</h2>
        <form onSubmit={handleSubmit} className="edit-post-form">
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows="4"
              placeholder="Write your caption here..."
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="caption">Description</label>
            <textarea
              id="caption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Write your Description here..."
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Current Images</label>
            <div className="current-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Post ${index}`}
                  className="image-preview"
                />
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="images">Upload New Images</label>
            <input
              type="file"
              id="images"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="submit-button">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
