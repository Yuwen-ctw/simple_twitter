import { PopularUserCard } from 'components/UserCards'
import { SectionTitle } from 'components/share'
import db from '../../../db.json'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
function PopularUserList({ users, className, onClick }) {
  const { state } = useLocation()
  if (state === 'setting') return

  // TODO: get user's followingList(maybe from context), which is fake below
  const [followings, setFollowings] = useState(db.loginUser.Followings)

  // handle following checkbox toggle
  const handleToggle = (targetUserId, isFollowing) => {
    // TODO send api
    const nextFollowings = [...followings]
    if (!isFollowing) {
      // avoid to add same id
      if (nextFollowings.includes(targetUserId)) return
      nextFollowings.push(targetUserId)
      return setFollowings(nextFollowings)
    }
    const index = nextFollowings.findIndex((id) => id === targetUserId)
    index && nextFollowings.splice(index, 1)
    return setFollowings(nextFollowings)
  }

  // map popularUsers
  const popularLists = users.map((user) => {
    // check if user is following
    const isFollowing = followings.some((followId) => followId === user.id)
    // check if the user is himself/herself
    if (user.id === db.loginUser.id) user.isLoginUser = true
    return (
      <PopularUserCard
        key={user.id}
        popularUser={user}
        onChange={handleToggle}
        isFollowed={isFollowing}
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
