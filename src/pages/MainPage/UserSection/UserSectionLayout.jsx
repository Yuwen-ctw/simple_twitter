import { Outlet, useParams } from 'react-router-dom'

function UserSectionLayout() {
  const { userId } = useParams()
  return (
    <>
      <h1>This is UserSectionLayout on /main/user/{userId}</h1>
      <Outlet />
    </>
  )
}

export default UserSectionLayout
