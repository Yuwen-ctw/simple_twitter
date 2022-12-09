import { Outlet } from 'react-router-dom'
import { AdminNavbar } from 'components/UI/Navbars'
function AdminMainLayout() {
  return (
    <>
      <h1>This is AdminMainLayout on /admin/main</h1>
      <AdminNavbar />
      <Outlet />
    </>
  )
}

export default AdminMainLayout
