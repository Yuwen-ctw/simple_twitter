import { UserNavbar } from 'components/UI/Navbars'
import { Outlet } from 'react-router-dom'
import styles from 'assets/styles/pages/mainPage.module.scss'
import PopularUserList from './PopularUserList'
import db from '../../../db.json'
function MainLayout() {
  // TODO send api here to get popularUsers
  return (
    <div className={styles.layout}>
      <UserNavbar />
      <Outlet />
      <PopularUserList users={db.popularUsers} className={styles.userList} />
    </div>
  )
}

export default MainLayout
