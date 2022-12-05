import { useLocation } from 'react-router-dom'

function NotFoundPage() {
  const locate = useLocation()
  return (
    <>
      <h1>This is NotFoundPage on {locate.pathname}</h1>
    </>
  )
}

export default NotFoundPage
