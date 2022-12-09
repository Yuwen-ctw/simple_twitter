import { useParams } from 'react-router-dom'

function UserRepliesSection() {
  const { userId } = useParams()
  return (
    <>
      <h1>This is UserReplySection on /main/user/{userId}</h1>
    </>
  )
}

export default UserRepliesSection
