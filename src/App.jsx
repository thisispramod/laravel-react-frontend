// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard';
import CreateCategory from './pages/CreateCategory';


function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts" element={<Posts />} /> 
      <Route path="/create" element={<CreatePost />} /> 
      <Route path="/CreateCategory" element={<CreateCategory />} />
    </Routes>
  )
}

export default App
