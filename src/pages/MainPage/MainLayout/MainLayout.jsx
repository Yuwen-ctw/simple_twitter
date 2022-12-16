import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { useAuth } from 'contexts/AuthContext'
import styles from 'assets/styles/pages/mainPage.module.scss'
import db from '../../../db.json'
import { useEffect, useState } from 'react'
import { TweetModal } from 'components/UI/Modals'
import { MainTweetsContextProvider } from 'contexts/MainTweetsContext'
function MainLayout() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { logout, isAuthenticated, currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
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
      dataSet.tweetid && navigate(`/tweet/${dataSet?.tweetid}`)
    } else {
      dataSet.userid && navigate(`/user/${dataSet?.userid}/tweets`)
    }
  }
  function handleToggleModal() {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.layout}>
      <MainTweetsContextProvider>
        <UserNavbar
          onLogout={logout}
          currentUserId={currentUser?.id}
          onModalButtonClick={handleToggleModal}
        />
        <Outlet context={{ handleUserOrTweetClick }} />
        <TweetModal active={showModal} onClose={handleToggleModal} />
      </MainTweetsContextProvider>
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
