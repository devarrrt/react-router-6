import { Suspense } from 'react'
import { Link, useNavigate, useLoaderData, Await, useAsyncValue } from 'react-router-dom'

const Post = () => {
  const post = useAsyncValue()

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  )
}

const Comments = () => {
  const comments = useAsyncValue()

  return (
    <>
      <h2>Comments</h2>
      {comments?.map((comment, idx) => (
        <div key={`${comment}_${idx}`}>
          <h3>
            {comment.email}
          </h3>
          <h4>
            {comment.name}
          </h4>
          <p>
            {comment.body}
          </p>
        </div>
      ))}
    </>
  )
}


const PostPage = () => {
  // const { id } = useParams()
  const navigate = useNavigate()
  const { post, id, comments } = useLoaderData()

  const goBack = () => navigate(-1)
  // const goHome = () => navigate('/', { replace: true })

  return (
    <>
      <button onClick={goBack}> Go Back </button>
      {/* bad approach. when we can use Link, it is better to use it */}
      {/* <button onClick={goHome}> Go Home </button> */}

      <Link to="/"> Go Home </Link>
      <Suspense fallback={<h2> Loading...</h2>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>

      <Suspense fallback={<h2> Loading...</h2>}>
        <Await resolve={comments}>
          <Comments />
        </Await>
      </Suspense>

      <Link to={`/posts/${id}/edit`}>Edit this post</Link>
    </>
  )
}

async function getPostById({ id }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  return res.json()
}

async function getComments({ id }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  return res.json()
}

const postLoader = async ({ params }) => {
  const id = params.id

  return { post: await getPostById({ id }), id, comments: getComments({ id }) }
}

export { PostPage, postLoader }