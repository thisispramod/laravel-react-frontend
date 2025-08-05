import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Posts(){
	const [posts, setPosts] = useState([])
	const [error, setError] = useState('')
	const navigate = useNavigate()
	const token = localStorage.getItem('token')
	useEffect(() => {
		const fetchPosts = async () => {
			const token = localStorage.getItem('token')
			// console.log(token);

			if(!token){
				setError('Please login first')
				navigate('/login')
				return 
			}
			try{
				const response = await axios.get('http://localhost:8000/api/posts', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				setPosts(response.data)
			} catch (err) {
				console.error(err)
				setError('Failed to fetch posts. Login again.')
				navigate('/login')
			}
		}
		fetchPosts()
	}, [])
	const handleLogout = async () => {
		try {
			await axios.post(
				'http://localhost:8000/api/logout',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}` //  Same token sent to logout
					}
				}
			)
			localStorage.removeItem('token') // clear token 
			navigate('/login')  // redirect to login page 
		} catch(err) {
			console.error('logout failed : ', err)
		}
	}
	return (
		<div style={{ padding: '2rem' }}>
			<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  }}
>
  <h2 style={{ margin: 0 }}>All Posts</h2>
  <button
    onClick={handleLogout}
    className="btn-logout"
  >
    Logout
  </button>
</div>

		{error && <p style={{ color: 'red' }}>{error}
			</p>}
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
		{posts.map(post => (
			<div
			key={post.id}
			style={{
				border: '1px solid #ccc',
				borderRadius: '8px',
				padding: '1rem',
				width: '300px',
				boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
				backgroundColor: '#fff'
			}}
			>
			<h3 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h3>
			<p style={{ margin: 0 }}>{post.body}</p>
			</div>
		))}
		</div>

	</div>
  )
}