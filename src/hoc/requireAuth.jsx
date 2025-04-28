import { useLocation, Navigate } from 'react-router-dom'

import { useAuth } from '../hook/useAuth'

// RequireAuth is a top - level component that will provide us with a transition to the login page if the user is not authorized.
const RequireAuth = ({ children }) => {
  const locatioin = useLocation()
  const { user } = useAuth()

  if (!user) return <Navigate to='/login' state={{ from: locatioin }} />

  return children
}

export { RequireAuth } 