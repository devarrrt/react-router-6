import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const PostPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)

  const goBack = () => navigate(-1)
  // const goHome = () => navigate('/', { replace: true })

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  return (
    <>
      <button onClick={goBack}> Go Back </button>
      {/* bad approach. when we can use Link, it is better to use it */}
      {/* <button onClick={goHome}> Go Home </button> */}

      <Link to="/"> Go Home </Link>

      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <Link to={`/posts/${id}/edit`}>Edit this post</Link>
        </>
      )}
    </>
  )
}

export { PostPage }