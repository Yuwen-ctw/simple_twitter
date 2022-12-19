import { Outlet } from 'react-router-dom'
import { AdminNavbar } from 'components/UI/Navbars'
import { useAuth } from 'contexts/AuthContext'
import styles from 'assets/styles/pages/adminLayout.module.scss'
function AdminMainLayout() {
  const { logout } = useAuth()

  return (
    <div className={styles.layout}>
      <AdminNavbar onLogout={logout} />
      <Outlet />
    </div>
  )
}

export default AdminMainLayout
