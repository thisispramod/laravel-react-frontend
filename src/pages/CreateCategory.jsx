import React, { useState } from 'react';
import axios from 'axios';

const CreateCategory = ({ token, onCategoryCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/categories', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert('Category created!');
      setName('');
      onCategoryCreated(); // refresh category list
    } catch (err) {
      alert('Error creating category');
      console.error(err);
    }
  };

  return (
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
  );
};

export default CreateCategory;
