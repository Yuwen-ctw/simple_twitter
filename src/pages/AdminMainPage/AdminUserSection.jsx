import { useEffect, useState } from 'react'
import useFetch from 'customHooks/useFetch'
import { getAllUsers } from 'api/admin'
import { SectionTitle, Spinner } from 'components/share'
import { AdminUserCard } from 'components/UserCards'
import styles from 'assets/styles/pages/adminMainSection.module.scss'

function AdminUserSetion() {
  const [users, setUsers] = useState([])
  const { data, loading } = useFetch(getAllUsers)

  useEffect(() => {
    if (!data) return
    setUsers(data)
  }, [loading])

  // map data
  const userList = users.map((user) => (
    <AdminUserCard key={user.id} user={user} />
  ))

  return (
    <section
      className={[styles.userLayout, 'scrollbar'].join(' ')}
      id="adminUserSection"
    >
      <SectionTitle text="使用者列表" />
      {loading && <Spinner />}
      <ul className={styles.userListContainer}>{userList}</ul>
    </section>
  )
}

export default AdminUserSetion
