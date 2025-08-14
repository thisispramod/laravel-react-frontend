import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please login first.');
      alert('Please log in before creating a category.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:8000/api/categories',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      alert('Category created!');
      console.log('Created Category:', res.data);
      setName('');
      if (onCategoryCreated) onCategoryCreated(); // refresh category list
    } catch (err) {
      console.error('Error creating category:', err.response?.data || err.message);
      alert(`Error: ${err.response?.data?.message || 'Failed to create category'}`);
    }
  };

  return (
    <div className="category-container">
      
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="New Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
