import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { useAuth } from 'contexts/AuthContext'
import styles from 'assets/styles/pages/mainPage.module.scss'
import db from '../../../db.json'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
function MainLayout() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { logout, hasAuthToken } = useAuth()

  useEffect(() => {
    if (!hasAuthToken) {
      Swal.fire({
        position: 'top',
        title: `請重新登入！`,
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      })
      navigate('login')
    }
  })
  // TODO send api here to get popularUsers

  // handle all event from clicking avatars and tweets
  function handleUserOrTweetClick(e) {
    // get rolename from target
    const rolename = e.target.dataset.rolename
    if (!rolename) return
    // get datasets from <li data-click> element
    const dataSet = e.target.closest('[data-click]')?.dataset
    // navigate to tweet
    if (rolename === 'content') {
      dataSet.tweetid && navigate(`/tweet/${dataSet.tweetid}`)
    } else {
      dataSet.userid && navigate(`/user/${dataSet.userid}/tweets`)
    }
  }
  return (
    <div className={styles.layout}>
      <UserNavbar onLogout={logout} />
      <Outlet context={{ handleUserOrTweetClick }} />
      {state !== 'setting' && (
        <PopularUserList
          users={db.popularUsers}
          className={styles.userList}
          onClick={handleUserOrTweetClick}
        />
      )}
    </div>
  )
}

export default MainLayout
