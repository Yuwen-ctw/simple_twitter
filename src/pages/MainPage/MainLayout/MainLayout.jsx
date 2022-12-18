import { useNavigate, Outlet } from 'react-router-dom'
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { useAuth } from 'contexts/AuthContext'
import styles from 'assets/styles/pages/mainPage.module.scss'
import db from '../../../db.json'
import { useEffect, useState } from 'react'
import { ReplyModal, TweetModal } from 'components/UI/Modals'
import { NewTweetContextProvider } from 'contexts/NewTweetContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
function MainLayout() {
  const navigate = useNavigate()
  const { logout, currentUser, isAuthenticated } = useAuth()
  const [showTweetModal, setShowTweetModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('login')
    }
  }, [])

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
  function handleToggleTweetModal() {
    setShowTweetModal(!showTweetModal)
  }
  return (
    <div className={styles.layout}>
      <NewTweetContextProvider>
        <ReplyContextProvider>
          <UserNavbar
            onLogout={logout}
            currentUserId={currentUser?.id}
            onModalButtonClick={handleToggleTweetModal}
          />
          <Outlet context={{ handleUserOrTweetClick, showTweetModal }} />
          <PopularUserList
            users={db.popularUsers}
            className={styles.userList}
            onClick={handleUserOrTweetClick}
          />
          <TweetModal
            active={showTweetModal}
            onClose={handleToggleTweetModal}
          />
          <ReplyModal />
        </ReplyContextProvider>
      </NewTweetContextProvider>
    </div>
  )
}

export default MainLayout
