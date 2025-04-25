import { Routes, Route } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PostPage } from './pages/PostPage'
import { CreatePost } from './pages/CreatePost'
import { EditPost } from './pages/EditPost'

import { Layout } from './components/Layout'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="post" element={<BlogPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/new" element={<CreatePost />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
