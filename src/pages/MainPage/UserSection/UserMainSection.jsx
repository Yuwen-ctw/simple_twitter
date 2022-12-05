import { useParams } from 'react-router-dom'

function UserMainSection() {
  const { userId } = useParams()
  return (
    <>
      <h1>This is UserMainSection on /main/user/{userId}</h1>
    </>
  )
}

export default UserMainSection
