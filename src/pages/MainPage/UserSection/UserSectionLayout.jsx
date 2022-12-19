import {
  Outlet,
  useOutletContext,
  useParams,
  useLocation,
} from 'react-router-dom'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import SectionHeader from './SectionHeader'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useEffect, useState } from 'react'
import { getUser, followUser, unfollowUser } from 'api/users'
import { useAuth } from 'contexts/AuthContext'

function UserSectionLayout() {
  const { currentUser } = useAuth()
  const [showEditModal, setShowEditModal] = useState(false)
  const [user, setUser] = useState({})
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  const isFollowSection = lastPath.match('follow')
  const [followState, setFollowState] = useState(currentUser.isFollowed)

  useEffect(() => {
    async function getUserData() {
      const { success, data, message } = await getUser(userId)
      if (success) {
        if (currentUser.id.toString() === userId) data.self = true
        setUser(data)
      } else {
        console.error(message)
      }
    }
    getUserData()
  }, [userId, followState])

  // show modal or not
  function handleToggleEditModal() {
    setShowEditModal(!showEditModal)
  }
  function handleEditInfomation(data) {
    setShowEditModal(!showEditModal)
    setUser({ ...user, ...data })
  }
  async function handleToggleFollow(userId, isFollowed) {
    const { success, message } = isFollowed
      ? await unfollowUser(userId)
      : await followUser(userId)
    if (success) {
      setUser({ ...user, isFollowed: !isFollowed })
      setFollowState(!followState)
    } else {
      console.error(message)
    }
  }

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <SectionHeader user={user} />
      {!isFollowSection && (
        <ProfileUserCard
          user={user}
          onClickEdit={handleToggleEditModal}
          onToggleFollow={handleToggleFollow}
        />
      )}
      <Outlet context={useOutletContext()} />
      <EditProfileModal
        showModal={showEditModal}
        onSave={handleEditInfomation}
        onClose={handleToggleEditModal}
      />
    </section>
  )
}

export default UserSectionLayout
