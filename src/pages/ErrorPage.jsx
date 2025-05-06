import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) { //here we check if the error is caused by routing
    return (
      <>
        {/* for key 1  (function getPosts)*/}
        {/* <div>Erorr: {error.status} {error?.statusText || 'Something goes wrong'} </div> */}

        {/* for key 2 (const blogLoader) */}
        <h1>
          {error.status}
        </h1>
        <h2>
          {error.data.message || 'Something goes wrong'}
        </h2>
        <h3>
          {error.data.reason}
        </h3>
      </>
    )
  }

  throw error

}

export { ErrorPage }