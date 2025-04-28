import { Link, useMatch } from 'react-router-dom'

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
    end: to.length === 1
  })

  //  This is a custom Link that makes working with the highlighting of the active link more convenient. It works due to the useMatch hook
  return (
    <Link to={to} {...props} style={{
      color: match ? 'var(--color-active)' : 'white'
    }}>
      {children}
    </Link>
  )
}

export { CustomLink }