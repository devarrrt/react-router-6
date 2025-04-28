import { Outlet, Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <>
      <h1>AboutPage</h1>
      {/* since we are already in the "about" page, we don't have to specify it again */}
      <ul>
        <li><Link to="contacts">Our Contacts</Link></li>
        <li><Link to="team">Our Team</Link></li>
      </ul>

      <Outlet />
    </>
  )
}

export { AboutPage } 