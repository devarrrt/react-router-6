import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = () => {
  const { id } = useParams()

  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [id])

  return (
    <>
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