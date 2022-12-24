// hooks & contexts
import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { NewTweetContextProvider } from 'contexts/NewTweetContext'
import { ReplyContextProvider } from 'contexts/ReplyContext'
import useFetch from 'customHooks/useFetch'
import { useFollowToggled } from 'contexts/FollowToggledContext'
// apis
import { getTop10Users } from 'api/users'
// components
import PopularUserList from './PopularUserList'
import { UserNavbar } from 'components/UI/Navbars'
import { ReplyModal, TweetModal } from 'components/UI/Modals'
import { Spinner } from 'components/share'
import styles from 'assets/styles/pages/mainPage.module.scss'

function MainLayout() {
  const navigate = useNavigate()
  const { logout, currentUser } = useAuth()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const [popularUsers, setPopularUsers] = useState([])
  const [showTweetModal, setShowTweetModal] = useState(false)
  const { data, loading } = useFetch(getTop10Users)

  useEffect(() => {
    if (!data) return
    setPopularUsers(data)
  }, [loading])

  // update data wherever user changed the follow state
  useEffect(() => updatePopularUsers(toggledUser), [toggledUser])

  function updatePopularUsers(targetUser) {
    if (!targetUser?.id) return
    setPopularUsers((draft) =>
      draft.map((user) =>
        user.id === targetUser.id
          ? { ...user, isFollowed: !user.isFollowed }
          : user
      )
    )
  }

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
          {loading ? (
            <Spinner />
          ) : (
            <>
              <UserNavbar
                onLogout={logout}
                currentUserId={currentUser?.id}
                onModalButtonClick={handleToggleTweetModal}
              />
              <Outlet context={{ handleUserOrTweetClick }} />
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
