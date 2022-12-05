import { Outlet } from 'react-router-dom'

function AdminMainLayout() {
  return (
    <>
      <h1>This is AdminMainLayout on /admin/main</h1>
      <Outlet />
    </>
  )
}

export default AdminMainLayout
