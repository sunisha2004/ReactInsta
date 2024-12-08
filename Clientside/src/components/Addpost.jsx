import React, { useState } from "react";
import "./AddPost.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caption: "",
    description: "",
  });
  const [base64Images, setBase64Images] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = [];
    const base64Promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          previews.push(reader.result);
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(base64Promises)
      .then((base64Strings) => {
        setImagePreviews(previews);
        setBase64Images(base64Strings);
      })
      .catch((error) => console.error("Error converting to Base64:", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      caption: formData.caption,
      description: formData.description,
      images: base64Images,
    };

    try {
      const res = await axios.post("http://localhost:3004/api/addPost", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post created successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="add-post-container">
      <form className="add-post-form" onSubmit={handleSubmit}>
        <h1 className="posthead">Create a Post</h1>
        
        <div className="form-group">
          <label htmlFor="images" className="upload-label">Upload Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="image-preview-container">
          {imagePreviews.map((src, index) => (
            <div key={index} className="image-preview">
              <img src={src} alt={`Preview ${index}`} />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={formData.caption}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
