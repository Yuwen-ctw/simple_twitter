import { useEffect, useState } from 'react'
import { SectionTitle, Spinner } from 'components/share'
import styles from 'assets/styles/pages/adminMainSection.module.scss'
import { AdminUserCard } from 'components/UserCards'
import { getAllUsers } from 'api/users'
function AdminUserSetion() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // show spinner
    setLoading(true)
    // get data
    async function getAllTweetsByAdminAsync() {
      const { success, data, message } = await getAllUsers()
      if (success) {
        setLoading(false)
        setUsers(data)
      } else {
        console.error(message)
      }
    }
    getAllTweetsByAdminAsync()
  }, [])

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
