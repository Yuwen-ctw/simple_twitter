import { Outlet, useOutletContext, useParams } from 'react-router-dom'
import { ProfileUserCard } from 'components/UserCards'
import { EditProfileModal } from 'components/UI/Modals'
import db from 'db.json'
import SectionHeader from './SectionHeader'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useState } from 'react'

function UserSectionLayout() {
  const [showModal, setShowModal] = useState(true)
  const { userId } = useParams()
  console.log(`user#${userId}'s personal page`)

  function handleToggleModal() {
    setShowModal(!showModal)
  }

  function handleSaveProfileInfo() {
    // TODO call api here
  }

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <SectionHeader user={db.loginUser} />
      <ProfileUserCard user={db.loginUser} onClickEdit={handleToggleModal} />
      <Outlet context={useOutletContext()} />
      <EditProfileModal
        user={db.loginUser}
        showModal={showModal}
        onClose={handleToggleModal}
        onSave={handleSaveProfileInfo}
      />
    </section>
  )
}

export default UserSectionLayout
