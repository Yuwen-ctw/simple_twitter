import { useParams } from 'react-router-dom'

function UserLikesSection() {
  const { userId } = useParams()
  return (
    <>
      <h1>This is UserLikeSection on /main/user/{userId}</h1>
    </>
  )
}

export default UserLikesSection
