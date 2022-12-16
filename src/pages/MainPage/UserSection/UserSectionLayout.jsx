import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import SectionHeader from './SectionHeader'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useEffect, useState } from 'react'
import { getUser } from 'api/users'

function UserSectionLayout() {
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState({})
  const { userId } = useParams()
  useEffect(() => {
    async function getUserData() {
      const { success, data, message } = await getUser(userId)
      if (success) {
        setUser(data)
      } else {
        console.error(message)
      }
    }
    getUserData()
  }, [userId])
  function handleToggleModal() {
    setShowModal(!showModal)
  }

  function handleSaveProfileInfo() {
    // TODO call api here
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
        onSave={handleSaveProfileInfo}
      />
    </section>
  )
}

export default UserSectionLayout
