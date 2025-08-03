import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Posts(){
	const [posts, setPosts] = useState([])
	const [error, setError] = useState('')
	const navigate = useNavigate()

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
	},[])
	return (
    <div style={{ padding: '2rem' }}>
      <h2>All Posts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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