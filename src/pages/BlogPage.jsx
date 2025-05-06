import { Link, useLoaderData, useSearchParams, defer, Await, json } from 'react-router-dom'
import { BlogFilter } from '../components/BlogFilter'
import { Suspense } from 'react'

const BlogPage = () => {
  const { posts } = useLoaderData() // this is a hook that will give us the result of the request execution

  // useSearchParams - instance of class URLSearchParams
  const [searchParams, setSearchParams] = useSearchParams()

  const postQuery = searchParams.get('post') || ''
  const latest = searchParams.has('latest')

  //if there is latest in the search line, then we take records from 80, if not, then from 1
  const startsFrom = latest ? 80 : 1

  //we can get rid of this code when using blogLoader function
  // useEffect(() => {
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(res => res.json())
  //   .then(data => setPosts(data))
  // }, [])

  return (
    <div>
      <h1>
        Our news
      </h1>
      <BlogFilter setSearchParams={setSearchParams} postQuery={postQuery} latest={latest} />
      <Link to="/posts/new" style={{ margin: '1rem 0', display: 'inline-block' }}>Add new post</Link>

      <Suspense fallback={<h2> Loading...</h2>}>
        <Await resolve={posts}>
          {(result) => (
            <>
              {
                result
                  //filter posts if they contain title = postQuery
                  .filter(post => post.title?.includes(postQuery) && post.id >= startsFrom)
                  .map(post => (
                    <Link key={post?.id} to={`/posts/${post?.id}`}>
                      <li>{post?.title}</li>
                    </Link>
                  ))
              }
            </>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

async function getPosts() {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  //for error
  const res = await fetch('https://jsonplaceholder.typicode.com/postssss')

  //we can check errors like this
  // if (!res.ok) {
  //   throw new Response('', { status: res.status, statusText: 'Not found' })
  // }
  return res.json()
}

const blogLoader = async ({ request, params }) => {

  //and we can check errors like this
  const posts = getPosts()

  if (!posts.length) {
    throw json({
      message: 'Sorry, not found',
      reason: 'Wrong url'
    }, {
      status: 404
    })
  }


  return defer({
    posts //thanks to defer we have the ability to wait until the data is received
  })
}

export { BlogPage, blogLoader }