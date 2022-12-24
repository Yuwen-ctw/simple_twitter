import { useEffect, useState } from 'react'
import { getAllUsers } from 'api/admin'
import { SectionTitle, Spinner } from 'components/share'
import { AdminUserCard } from 'components/UserCards'
import Toast from 'components/UI/Toast'
import styles from 'assets/styles/pages/adminMainSection.module.scss'
import useFetch from 'api/useFetch'

function AdminUserSetion() {
  // const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const { data, loading, error } = useFetch(getAllUsers)

  useEffect(() => {
    if (error) Toast(error, 'error').fire()
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
