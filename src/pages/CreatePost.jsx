import { redirect, useNavigation } from 'react-router-dom'

import { NewPost } from '../components/NewPost'

const CreatePost = () => {
  const navigation = useNavigation() // not to be confused with useNavigate()
  
  return (
    <div>
      <h2>
        <NewPost submitting={navigation.state === 'submitting'}/>
      </h2>
    </div>
  )
}

const createPost = async ({ title, body, userId }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, userId })
  })

  const newPost = await res.json()
  return newPost
}

const createPostAction = async ({ request }) => {
  const formData = await request.formData()

  const newPost = {
    title: formData.get('title'),
    body: formData.get('body'),
    userId: formData.get('userId')

  }
  const post = await createPost(newPost)

  return redirect('/posts/' + post.id)
}

export { CreatePost, createPostAction }
