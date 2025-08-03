import {useState} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

export default function Register(){
     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error, setError] = useState('')
     const navigate = useNavigate()
     const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        try{
            const response = await axios.post('http://localhost:8000/api/register', {
                name, 
                email,
                password
            })
            const token = response.data.token 
            localStorage.setItem('token', token)
            navigate('/posts')
        }catch (err){
            console.error(err)
            setError(err.response?.data?.message || 'Registration failed')
        } 
    }
    return (
     <div className="login-signup-form animated fadeInDown">
            <div className="form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <h1 className="title">
            Signup for free
        </h1>
        <div>
          <label>Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-block" style={{ marginTop: '1rem' }}>Register</button>
        <p className="message">Already Registered?
          <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
    </div>
  )
}