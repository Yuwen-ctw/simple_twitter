// hooks & contexts
import { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { NewTweetContextProvider } from 'contexts/NewTweetContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import { FollowToggledContextProvider } from 'contexts/FollowToggledContext'
import { EditContextProvider } from 'contexts/EditContext'
// components
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { ReplyModal, TweetModal } from 'components/UI/Modals'
import styles from 'assets/styles/pages/mainPage.module.scss'

function MainLayout() {
  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()
  const [showTweetModal, setShowTweetModal] = useState(false)

  function handleToggleTweetModal() {
    setShowTweetModal(!showTweetModal)
  }

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

  return (
    <div className={styles.layout}>
      <NewTweetContextProvider>
        <ReplyContextProvider>
          <EditContextProvider>
            <FollowToggledContextProvider>
              <UserNavbar
                onLogout={logout}
                currentUserId={currentUser?.id}
                onModalButtonClick={handleToggleTweetModal}
              />
              <Outlet context={{ handleUserOrTweetClick }} />
              <PopularUserList
                className={styles.userList}
                onClick={handleUserOrTweetClick}
              />
              <TweetModal
                active={showTweetModal}
                onClose={handleToggleTweetModal}
              />
              <ReplyModal />
            </FollowToggledContextProvider>
          </EditContextProvider>
        </ReplyContextProvider>
      </NewTweetContextProvider>
    </div>
  )
}

export default MainLayout
