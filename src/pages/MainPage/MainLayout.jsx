import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <h1>This is MainLayout on /</h1>
      <Outlet />
    </>
  )
}

export default MainLayout
