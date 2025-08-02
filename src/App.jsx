// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Posts from './pages/Posts'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  )
}

export default App
