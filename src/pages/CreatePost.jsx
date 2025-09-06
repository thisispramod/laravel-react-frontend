import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const CreatePost = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category_id: '',
    meta_title: '',
    meta_description: '',
    status: 'draft'
  });

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('http://localhost:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire({
        title: "Success!",
        text: "Post created successfully 🎉",
        icon: "success",
        confirmButtonText: "OK", 
      });

      setFormData({
        title: "",
        body: "",
        category_id: "",
        meta_title: "",
        meta_description: "",
        status: "draft"
      });

    } catch (err) {
      console.error("Post creation failed", err.response?.data);

      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "Try Again", 
      });
    }
  };
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1); // goes back
  };
  return (
    <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Body</label>
          <textarea
            name="body"
            placeholder="Enter body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Meta Title</label>
          <input
            name="meta_title"
            placeholder="SEO Meta Title"
            value={formData.meta_title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Meta Description</label>
          <input
            name="meta_description"
            placeholder="SEO Meta Description"
            value={formData.meta_description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      <div className="button-group">
        <button type="submit" className="btn btn-primary">Create Post</button>
        <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>Cancel</button>
      </div>
      </form>
    </div>
  );
};

export default CreatePost;
