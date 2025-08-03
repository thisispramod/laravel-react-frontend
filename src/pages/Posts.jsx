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
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<h2>All Posts</h2>
				<button onClick={handleLogout} className="btn-logout" >Logout</button>
			</div>
		{error && <p style={{ color: 'red' }}>{error}
			</p>}
		<ul>
			{posts.map(post => (
			<li key={post.id}>
				<strong>{post.title}</strong><br />
				{post.content}
			</li>
			))}
		</ul>
	</div>
  )
}