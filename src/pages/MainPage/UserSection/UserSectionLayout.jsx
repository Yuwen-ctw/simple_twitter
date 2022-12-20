import {
  Outlet,
  useOutletContext,
  useParams,
  useLocation,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser, followUser, unfollowUser } from 'api/users'
import { useAuth } from 'contexts/AuthContext'
import SectionHeader from './SectionHeader'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import styles from 'assets/styles/pages/userSection.module.scss'

function UserSectionLayout() {
  const { currentUser } = useAuth()
  const [user, setUser] = useState({})
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  const [loading, setLoading] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [followState, setFollowState] = useState(currentUser?.isFollowed)
  const isFollowSection = lastPath.match('follow')

  useEffect(() => {
    setLoading(true)
    async function getUserData() {
      const { success, data, message } = await getUser(userId)
      if (success) {
        if (currentUser?.id.toString() === userId) data.self = true
        setUser(data)
        setLoading(false)
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
    console.log(data)
    setShowEditModal(!showEditModal)
    setUser({
      ...user,
      ...data,
    })
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
      {loading ? (
        ''
      ) : (
        <ProfileUserCard
          user={user}
          onClickEdit={handleToggleEditModal}
          onToggleFollow={handleToggleFollow}
          className={isFollowSection && 'hide'}
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
