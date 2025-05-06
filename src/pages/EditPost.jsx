import { useActionData, useLoaderData, useNavigation } from 'react-router-dom'

import { UpdatePost } from '../components/UpdatePost'

const EditPost = () => {
  const { post, id } = useLoaderData()
  const navigation = useNavigation()
  const data = useActionData()

  return (
    <>
      <h2> Edit post {id}</h2>
      {data?.message && <div style={{ color: 'pink' }}>{data.message}</div>}
      <UpdatePost  {...post} submitting={navigation.state === 'submitting'} />
    </>
  )
}

const updatePost = async (post) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.get('id')}`, {
    method: 'PUT',
    body: post
  })
  return res.json()
}


const updatePostAction = async ({ request }) => {
  const formData = await request.formData()

  if (!formData.get('title') || !formData.get('body')) {
    return { message: 'All field are required!!!' }
  }

  const updatedPost = await updatePost(formData)

  return { message: `Post ${updatedPost.id} was successfully updated` }
}


export { EditPost, updatePostAction }