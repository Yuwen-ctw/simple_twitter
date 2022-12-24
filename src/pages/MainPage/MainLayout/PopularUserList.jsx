// hooks
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from 'customHooks/useFetch'
// contexts
import { useAuth } from 'contexts/AuthContext'
import { useEdit } from 'contexts/EditContext'
import { useFollowToggled } from 'contexts/FollowToggledContext'
// api & components
import { getTop10Users } from 'api/users'
import { PopularUserCard } from 'components/UserCards'
import { SectionTitle } from 'components/share'

function PopularUserList({ className, onClick }) {
  const { currentUser } = useAuth()
  const { isEdited } = useEdit()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const [popularUsers, setPopularUsers] = useState([])
  const { data, loading, refetch } = useFetch(getTop10Users)
  const { state } = useLocation()

  useEffect(() => {
    if (!data) return
    setPopularUsers(data)
  }, [loading])

  // refetch when user change his/her profile
  useEffect(() => {
    if (!isEdited) return
    refetch(getTop10Users)
  }, [isEdited])

  // update data wherever user changed the follow state
  useEffect(() => updatePopularUsers(toggledUser), [toggledUser])

  function updatePopularUsers(targetUser) {
    if (!targetUser?.id) return
    setPopularUsers((draft) =>
      draft.map((user) =>
        user.id === targetUser.id
          ? { ...user, isFollowed: !user.isFollowed }
          : user
      )
    )
  }

  // map popularUsers
  const popularLists = popularUsers.map((user) => {
    // check if the user is himself/herself
    if (user.id === currentUser?.id) user.isLoginUser = true
    return (
      <PopularUserCard
        key={user.id}
        popularUser={user}
        onChange={handleToggleFollow}
      />
    )
  })

  if (state === 'setting') return
  return (
    <ul className={className} onClick={onClick}>
      <SectionTitle text="推薦跟隨" />
      {popularLists}
    </ul>
  )
}
export default PopularUserList
