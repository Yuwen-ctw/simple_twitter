import { PopularUserCard } from 'components/UserCards'
import { SectionTitle } from 'components/share'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
function PopularUserList({ users, className, onClick, onToggleFollow }) {
  const { currentUser } = useAuth()
  const { state } = useLocation()
  if (state === 'setting') return

  // map popularUsers
  const popularLists = users.map((user) => {
    // check if the user is himself/herself
    if (user.id === currentUser?.id) user.isLoginUser = true
    return (
      <PopularUserCard
        key={user.id}
        popularUser={user}
        onChange={onToggleFollow}
      />
    )
  })
  return (
    <ul className={className} onClick={onClick}>
      <SectionTitle text="推薦跟隨" />
      {popularLists}
    </ul>
  )
}
export default PopularUserList
