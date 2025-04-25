import React from 'react'
import { Outlet } from 'react-router-dom'

import { CustomLink } from './CustomLink'

const Layout = () => {
  return (
    <>
      <header>
        {/* NavLink helps to us to define styles for the active state of a link. it automatically adds the active class. it also accepts functions */}
        {/* <NavLink to='/'> Home </CustomLink> */}

        <CustomLink to='/'> Home </CustomLink>
        <CustomLink to='/post'> Blog </CustomLink>
        <CustomLink to='/about'> About </CustomLink>
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