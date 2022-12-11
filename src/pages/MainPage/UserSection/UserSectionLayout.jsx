import { Outlet, useParams } from 'react-router-dom'
import { ProfileUserCard } from 'components/UserCards'
import db from 'db.json'
import SectionHeader from './SectionHeader'
function UserSectionLayout() {
  const { userId } = useParams()
  console.log(`user#${userId}'s personal page`)
  return (
    <section>
      <SectionHeader user={db.loginUser} />
      <ProfileUserCard user={db.loginUser} />
      <Outlet />
    </section>
  )
}

export default UserSectionLayout
