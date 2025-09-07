import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Dashboard = () => {
  const token = localStorage.getItem('token'); 
  const [categories, setCategories] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategory, setEditCategory] = useState({ id: "", name: "" }); 

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
     fetchCategories();
     fetchPosts();
     fetchUsers();
  }, []);
  
    const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCategories(response.data);
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalPosts(response.data.length);
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalUsers(response.data.length);
  };

  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/categories",
        { name: newCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowAddModal(false);
      setNewCategoryName("");
      Swal.fire({
        title: "Success!",
        text: "Category created successfully 🎉",
        icon: "success",
        confirmButtonText: "OK", 
      });
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

    const handleUpdateCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8000/api/categories/${editCategory.id}`,
        { name: editCategory.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowEditModal(false);
      fetchCategories();
      Swal.fire(
        'Updated!',
        'Category has been updated.',
        'success'
      );
    } catch (error) {
      console.error(error);
    }
  };
  
const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel'
  });
  if(result.isConfirmed){
  try {
    const token = localStorage.getItem("token");
    await axios.delete(
      `http://localhost:8000/api/categories/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ); 
    fetchCategories();
     Swal.fire(
        'Deleted!',
        'Category has been deleted.',
        'success'
      );
  } catch (error) {
    console.error(error);
    Swal.fire(
        'Error!',
        'Something went wrong while deleting.',
        'error'
      );
  }
}
};
const navigate = useNavigate();

  const handleAddPost = () => { 
    navigate('/createpost');
  };
  return (
    <div className="dashboard-container"> 
 <button onClick={() => setShowAddModal(true)} className='btn-add'>+Add Category</button>
 <button onClick={handleAddPost} style={{marginLeft:'23px'}} className='btn-add'>+Add Post</button>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-box"><Link to="/posts" style={{textDecoration:' none'}}>📄 Posts: {totalPosts}</Link> </div>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat.id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>
                <button
                  onClick={() => {
                    setEditCategory({ id: cat.id, name: cat.name });
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                   onClick={() => handleDeleteCategory(cat.id)}
                >Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Category</h3><br />
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category Name"
            />
            <button onClick={handleAddCategory} className='model-add-btn'>Save</button>
            <button onClick={() => setShowAddModal(false)} className='model-cancel-btn'>Cancel</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Category</h3>
            <input
              type="text"
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
            />
            <button onClick={handleUpdateCategory} className='model-add-btn'>Update</button>
            <button onClick={() => setShowEditModal(false)} className='model-cancel-btn'>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
