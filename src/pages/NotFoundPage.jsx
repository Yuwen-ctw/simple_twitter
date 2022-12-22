import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()
  navigate('/')
}

export default NotFoundPage
