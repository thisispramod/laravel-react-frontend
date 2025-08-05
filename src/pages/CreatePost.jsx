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
                user_id: 1 // ⚠️ Replace with actual logged-in user ID (if available)
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
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title" onChange={handleChange} required />
                <textarea name="body" placeholder="Body" onChange={handleChange} required />

                <select name="category_id" onChange={handleChange} required>
                    <option value="">-- Select Category --</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <input name="meta_title" placeholder="Meta Title" onChange={handleChange} />
                <input name="meta_description" placeholder="Meta Description" onChange={handleChange} />
                
                <select name="status" onChange={handleChange}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreatePost;