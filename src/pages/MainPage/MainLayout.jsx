import { UserNavbar } from 'components/UI/Navbars'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <h1>This is MainLayout on /</h1>
      <UserNavbar />
      <Outlet />
    </>
  )
}

export default MainLayout
