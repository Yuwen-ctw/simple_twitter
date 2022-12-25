// hooks
import {
  Outlet,
  useOutletContext,
  useParams,
  useLocation,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from 'customHooks/useFetch'
import useRWD from 'customHooks/useRWD'
// contexts
import { useAuth } from 'contexts/AuthContext'
import { useEdit } from 'contexts/EditContext'
import { useFollowToggled } from 'contexts/FollowToggledContext'
// api
import { getUser } from 'api/users'
// components
import SectionHeader from './SectionHeader'
import { ProfileUserCard } from 'components/UserCards'
import { SwitchLink } from 'components/UI/Buttons'
import { EditProfileModal } from 'components/UI/Modals'
import { Spinner } from 'components/share'
import styles from 'assets/styles/pages/userSection.module.scss'

function UserSectionLayout() {
  const { isOnMobile } = useRWD()
  const { currentUser } = useAuth()
  const { showEditModal, handleToggleEditModal, handleEdit } = useEdit()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  const isFollowSection = lastPath.match('follow')
  const [user, setUser] = useState({})
  const { data, loading, refetch } = useFetch(getUser, { userId })

  useEffect(() => {
    if (!data || !currentUser?.id) return
    if (currentUser?.id === Number(userId)) data.self = true
    setUser(data)
  }, [loading, currentUser?.id])

  // refetch when route parameter :userId changed
  useEffect(() => {
    if (!data) return
    refetch(getUser, { userId })
  }, [userId])

  // update user data wherever current-user changed the follow state
  useEffect(() => {
    if (!currentUser?.id) return
    updateCurrentUser(toggledUser)
  }, [toggledUser])

  function updateCurrentUser(toggledUser) {
    const isIncrease = toggledUser.isFollowed ? 1 : -1
    if (user.id === currentUser.id) {
      setUser({ ...user, followingCount: user.followingCount + isIncrease })
    } else if (toggledUser.id === user.id) {
      setUser({
        ...user,
        isFollowed: !user.isFollowed,
        followerCount: user.followerCount + isIncrease,
      })
    }
  }

  function handleEditClick(data) {
    handleEdit()
    setUser({
      ...user,
      ...data,
    })
  }

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <SectionHeader user={user} />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ProfileUserCard
            user={user}
            onClickEdit={handleToggleEditModal}
            onToggleFollow={handleToggleFollow}
            className={isFollowSection && !isOnMobile && 'hide'}
          />
          <div
            className={[styles.switchers, isFollowSection && 'hide'].join(' ')}
          >
            <SwitchLink text="推文" to={`/user/${user.id}/tweets`} />
            <SwitchLink text="回覆" to={`/user/${user.id}/replied_tweets`} />
            <SwitchLink text="喜歡的內容" to={`/user/${user.id}/likes`} />
          </div>
          <Outlet context={useOutletContext()} />
        </>
      )}
      {showEditModal && (
        <EditProfileModal
          user={user}
          onSave={handleEditClick}
          onClose={handleToggleEditModal}
        />
      )}
    </section>
  )
}

export default UserSectionLayout
