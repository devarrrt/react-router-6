import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { CustomLink } from './CustomLink'

import { useAuth } from '../hook/useAuth'

const Layout = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    signOut(() => navigate('/', { replace: 'true' }))
  }

  return (
    <>
      <header style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
        {/* NavLink helps to us to define styles for the active state of a link. it automatically adds the active class. it also accepts functions */}
        {/* <NavLink to='/'> Home </CustomLink> */}

        <CustomLink to='/'> Home </CustomLink>
        <CustomLink to='/post'> Blog </CustomLink>
        <CustomLink to='/about'> About </CustomLink>
        {
          user && <button onClick={logout}>
            Log out
          </button>
        }
      </header>

      <main className='container'>
        {/* Outlet is a placeholder component that will display whatever content our current page contains */}
        <Outlet />
      </main>

      <footer className='container'>
        {/* footer */}
      </footer>
    </>

  )
}

export { Layout }