import { UserNavbar } from 'components/UI/Navbars'
import { Outlet } from 'react-router-dom'
import styles from 'assets/styles/pages/mainPage.module.scss'
import PopularUserList from './PopularUserList'
import db from '../../../db.json'
import { useLocation } from 'react-router-dom/dist/index'
import { useNavigate } from 'react-router-dom'

function MainLayout() {
  const navigate = useNavigate()
  const { state } = useLocation()
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
      <UserNavbar />
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
