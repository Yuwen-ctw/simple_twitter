import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import SectionHeader from './SectionHeader'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useEffect, useState } from 'react'
import { getUser } from 'api/users'
import { useAuth } from 'contexts/AuthContext'

function UserSectionLayout() {
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState({})
  const { userId } = useParams()

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
  }, [userId, showModal])

  // show modal or not
  function handleToggleModal() {
    setShowModal(!showModal)
  }

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <SectionHeader user={user} />
      <ProfileUserCard user={user} onClickEdit={handleToggleModal} />
      <Outlet context={useOutletContext()} />
      <EditProfileModal
        user={user}
        showModal={showModal}
        onClose={handleToggleModal}
      />
    </section>
  )
}

export default UserSectionLayout
