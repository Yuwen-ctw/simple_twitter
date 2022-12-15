import { useParams, useLocation } from 'react-router-dom'
import SectionHeader from './SectionHeader'
import SwitchLink from 'components/UI/Buttons/SwitchLink'
import { FollowUserCard } from 'components/UserCards/index'
import styles from 'assets/styles/pages/userSection.module.scss'
import db from 'db.json'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function UserFollowersSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { userId } = useParams()
  // TODO send api to get userList accroding lastPath,
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  // TODO: get user's followingList(maybe from context), which is fake below
  const [followings, setFollowings] = useState(db.loginUser.following)
  const [userList, setUserList] = useState([])

  useEffect(() => {
    setUserList(db[lastPath])
  }, [lastPath])

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

  // map userList
  const listData = userList.map((user) => {
    // check if user is following
    const isFollowing = followings.some((followId) => followId === user.id)
    // check if the user is himself/herself
    if (user.id === db.loginUser.id) user.isLoginUser = true

    return (
      <FollowUserCard
        key={user.id}
        user={user}
        isFollowing={isFollowing}
        onChange={handleToggle}
      />
    )
  })
  return (
    <section className={styles.sectionWrapper}>
      <SectionHeader user={db.loginUser} />
      <div className={styles.switchWrapper}>
        <SwitchLink text="追隨者" to={`/user/${userId}/followers`} />
        <SwitchLink text="正在追隨" to={`/user/${userId}/followings`} />
      </div>
      <ul className="scrollbar" onClick={handleUserOrTweetClick}>
        {listData}
      </ul>
    </section>
  )
}

export default UserFollowersSection
