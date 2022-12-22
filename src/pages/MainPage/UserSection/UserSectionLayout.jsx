import {
  Outlet,
  useOutletContext,
  useParams,
  useLocation,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from 'api/users'
import { useAuth } from 'contexts/AuthContext'
import SectionHeader from './SectionHeader'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useFollowToggled } from 'contexts/FollowToggledContext'

function UserSectionLayout() {
  const { currentUser, isAuthenticated } = useAuth()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  const [user, setUser] = useState({})
  const [showEditModal, setShowEditModal] = useState(false)
  const isFollowSection = lastPath.match('follow')

  useEffect(() => {
    async function getUserData() {
      const { success, data, message } = await getUser(userId)
      if (success) {
        if (currentUser?.id.toString() === userId) data.self = true
        setUser(data)
      } else {
        console.error(message)
      }
    }
    getUserData()
  }, [userId, currentUser])

  // update user data wherever current-user changed the follow state
  useEffect(() => {
    if (!isAuthenticated) return
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

  // show modal or not
  function handleToggleEditModal() {
    setShowEditModal(!showEditModal)
  }

  function handleEditInfomation(data) {
    setShowEditModal(!showEditModal)
    setUser({
      ...user,
      ...data,
    })
  }

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <SectionHeader user={user} />
      <ProfileUserCard
        user={user}
        onClickEdit={handleToggleEditModal}
        onToggleFollow={handleToggleFollow}
        className={isFollowSection && 'hide'}
      />
      <Outlet context={useOutletContext()} />
      {showEditModal && (
        <EditProfileModal
          user={user}
          onSave={handleEditInfomation}
          onClose={handleToggleEditModal}
        />
      )}
    </section>
  )
}

export default UserSectionLayout
