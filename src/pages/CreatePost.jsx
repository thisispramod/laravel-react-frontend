import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/posts', {
                ...formData,
                user_id: 1 // 
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Post created successfully!");
        } catch (err) {
            console.error("Post creation failed", err.response.data);
            alert("Error creating post.");
        }
    };

    return (
  <div className="form-container">
    <h2>Create New Post</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input name="title" placeholder="Enter title" onChange={handleChange} required />
      </div>

      <div>
        <label>Body</label>
        <textarea name="body" placeholder="Enter body" onChange={handleChange} required />
      </div>

      <div>
        <label>Category</label>
        <select name="category_id" onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Meta Title</label>
        <input name="meta_title" placeholder="SEO Meta Title" onChange={handleChange} />
      </div>

      <div>
        <label>Meta Description</label>
        <input name="meta_description" placeholder="SEO Meta Description" onChange={handleChange} />
      </div>

      <div>
        <label>Status</label>
        <select name="status" onChange={handleChange}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button type="submit">Create Post</button>
    </form>
  </div>
);

};

export default CreatePost;