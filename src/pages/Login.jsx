import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const handleLogin = async (e) => {
		e.preventDefault()
		setError('')
		try{
			const response = await axios.post('http://localhost:8000/api/login', {
				email,
				password,
			})
			const token = response.data.token 
			localStorage.setItem('token', token)
			navigate('/posts')
		} catch (err){
			console.error(err)
			setError(err.response?.data?.message || 'Login failed')
		}
	}
	 return (
    <div className="login-signup-form animated fadeInDown">
            <div className="form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
		<h1 className="title">
			Login
		</h1>
        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-block" style={{ marginTop: '1rem' }}>Login</button>
		<p className="message">Not Registered <Link to="/register">
                    Create an Account</Link></p>
      </form>
    </div>
    </div>
  )
}