import { Routes, Route, Navigate } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { AboutPage } from './pages/AboutPage'
import { BlogPage } from './pages/BlogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PostPage } from './pages/PostPage'
import { CreatePost } from './pages/CreatePost'
import { EditPost } from './pages/EditPost'
import { LoginPage } from './pages/LoginPage'

import { Layout } from './components/Layout'

import { RequireAuth } from './hoc/requireAuth'
import { AuthProvider } from './hoc/authProvider'

import './App.css'

// Navigate to redirects us to the desired address.works as a redirect. replace is needed so that history does not save unnecessary address
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* here we use a layout that uses '/' as a constant character in the address bar. this means that we can omit the '/' from here on */}
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="about/*" element={<AboutPage />}>
            <Route path="contacts" element={<p>Our contact</p>} />
            <Route path="team" element={<p>Our team</p>} />
          </Route>

          <Route path="about-us" element={<Navigate to='/about' replace />} />
          <Route path="post" element={<BlogPage />} />
          <Route path="posts/:id" element={<PostPage />} />
          <Route path="posts/new" element={
            <RequireAuth>
              <CreatePost />
            </RequireAuth>
          } />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
