// hooks & contexts
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { NewTweetContextProvider } from 'contexts/NewTweetContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
// apis
import { getTop10Users, unfollowUser, followUser } from 'api/users'
// components
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { ReplyModal, TweetModal } from 'components/UI/Modals'
import { Spinner } from 'components/share'
import styles from 'assets/styles/pages/mainPage.module.scss'

function MainLayout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { logout, currentUser, isAuthenticated } = useAuth()
  const [popularUsers, setPopularUsers] = useState([])
  const [showTweetModal, setShowTweetModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('login')
    }
  }, [])

  useEffect(() => {
    setLoading(true)

    async function getPopulars() {
      const { success, data, message } = await getTop10Users()
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setPopularUsers(data)
      } else {
        // handle error
        console.error(message)
      }
    }
    getPopulars()
  }, [])

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
  async function handleToggleFollow(userId, isFollowed) {
    const { success, message } = isFollowed
      ? await unfollowUser(userId)
      : await followUser(userId)
    if (success) {
      setPopularUsers((draft) =>
        draft.map((user) =>
          user.id === userId ? { ...user, isFollowed: !user.isFollowed } : user
        )
      )
    } else {
      console.error(message)
    }
  }

  function handleToggleTweetModal() {
    setShowTweetModal(!showTweetModal)
  }

  return (
    <div className={styles.layout}>
      <NewTweetContextProvider>
        <ReplyContextProvider>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <UserNavbar
                onLogout={logout}
                currentUserId={currentUser?.id}
                onModalButtonClick={handleToggleTweetModal}
              />
              <Outlet context={{ handleUserOrTweetClick, showTweetModal }} />
              <PopularUserList
                users={popularUsers}
                className={styles.userList}
                onClick={handleUserOrTweetClick}
                onToggleFollow={handleToggleFollow}
              />
              <TweetModal
                active={showTweetModal}
                onClose={handleToggleTweetModal}
              />
              <ReplyModal />
            </>
          )}
        </ReplyContextProvider>
      </NewTweetContextProvider>
    </div>
  )
}

export default MainLayout
