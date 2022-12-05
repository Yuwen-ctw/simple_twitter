import { useParams } from 'react-router-dom'

function UserFollowersSection() {
  const { userId } = useParams()
  // 使用state判斷是使用者應進入 /follower 或是 /following
  // const { state } = useLocation()
  return (
    <>
      <h1>This is UserFollowSection on /main/user/{userId}</h1>
    </>
  )
}

export default UserFollowersSection
