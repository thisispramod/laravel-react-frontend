// src/App.jsx
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard';
import CreateCategory from './pages/CreateCategory';
import ProtectedRoute from './pages/ProtectedRoute';


function App() {
  return ( 
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />  
        <Route path="/createCategory" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
        <Route path="/createpost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      </Routes> 
  );
}

export default App

