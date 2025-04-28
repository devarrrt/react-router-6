import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BlogFilter } from '../components/BlogFilter'

const BlogPage = () => {
  const [posts, setPosts] = useState([])

  // useSearchParams - instance of class URLSearchParams
  const [searchParams, setSearchParams] = useSearchParams()

  const postQuery = searchParams.get('post') || ''
  const latest = searchParams.has('latest')

  //if there is latest in the search line, then we take records from 80, if not, then from 1
  const startsFrom = latest ? 80 : 1

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  return (
    <div>
      <h1>
        Our news
      </h1>
      <BlogFilter setSearchParams={setSearchParams} postQuery={postQuery} latest={latest} />
      <Link to="/posts/new" style={{ margin: '1rem 0', display: 'inline-block' }}>Add new post</Link>
      {
        posts
          //filter posts if they contain title = postQuery
          .filter(post => post.title?.includes(postQuery) && post.id >= startsFrom)
          .map(post => (
            <Link key={post?.id} to={`/posts/${post?.id}`}>
              <li>{post?.title}</li>
            </Link>
          ))
      }
    </div>
  )
}

export { BlogPage }