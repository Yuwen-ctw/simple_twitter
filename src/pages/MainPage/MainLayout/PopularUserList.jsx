import { PopularUserCard } from 'components/UserCards'
import { SectionTitle } from 'components/share'
import db from '../../../db.json'
import { useState } from 'react'
function PopularUserList({ users, className }) {
  // TODO: get user's followingList(maybe from context), which is fake below
  const [followings, setFollowings] = useState(db.loginUser.following)

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
    return (
      <PopularUserCard
        key={user.id}
        popularUser={user}
        onChange={handleToggle}
        isFollowing={isFollowing}
      />
    )
  })
  return (
    <ul className={className}>
      <SectionTitle text="推薦跟隨" />
      {popularLists}
    </ul>
  )
}
export default PopularUserList