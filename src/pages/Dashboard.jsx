import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCategory from './CreateCategory';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchAll = async () => {
    try {
      const [catRes, postRes, userRes] = await Promise.all([
        axios.get('http://localhost:8000/api/categories', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/posts', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:8000/api/user', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setCategories(catRes.data);
      setTotalPosts(postRes.data.length);
      setTotalUsers(userRes.data.length);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="dashboard-container">
        <Link to="/CreateCategory">
  <button className="btn">+ New Category</button>
</Link>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-box">📄 Posts: {totalPosts}</div>
        <div className="stat-box">📂 Categories: {categories.length}</div>
        <div className="stat-box">👤 Users: {totalUsers}</div>
      </div>
 

      <h3>All Categories</h3>
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
