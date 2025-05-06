import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { blogLoader, BlogPage } from './pages/BlogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { postLoader, PostPage } from './pages/PostPage'
import { CreatePost, createPostAction } from './pages/CreatePost'
import { EditPost, updatePostAction } from './pages/EditPost'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'

import { Layout } from './components/Layout'

import { RequireAuth } from './hoc/requireAuth'
import { AuthProvider } from './hoc/authProvider'

import './App.css'

//with the react-router update we now have the ability to load data via routing.for this we are implementing this wrapper. Routes are deleted in this case
const router = createBrowserRouter(createRoutesFromElements(
  /* here we use a layout that uses '/' as a constant character in the address bar. this means that we can omit the '/' from here on */
  <Route path='/' element={<Layout />}>
    <Route index element={<MainPage />} />

    <Route path="about/*" element={<AboutPage />}>
      <Route path="contacts" element={<p>Our contact</p>} />
      <Route path="team" element={<p>Our team</p>} />
    </Route>

    <Route path="about-us" element={<Navigate to='/about' replace />} />
    {/* errorElement allows us to catch errors related to routing and data preloading. This prop does not exclude the use of ErrorBoundary */}
    <Route path="posts" element={<BlogPage />} loader={blogLoader} errorElement={<ErrorPage />} />
    <Route path="posts/:id" element={<PostPage />} loader={postLoader} />

    <Route path="posts/new" element={
      <RequireAuth>
        <CreatePost />
      </RequireAuth>
      //  when going to the page, we will receive the request parameter in the createPostAction parameters
    } action={createPostAction} />

    {/* it's not good solution */}
    <Route path="posts/:id/edit" element={<EditPost />} loader={postLoader} action={updatePostAction} />

    <Route path="login" element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
))

// Navigate to redirects us to the desired address.works as a redirect. replace is needed so that history does not save unnecessary address
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
