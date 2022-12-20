import { useEffect, useState } from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { getUserInfoData, followUser, unfollowUser } from 'api/users'
import { FollowUserCard } from 'components/UserCards/index'
import { Spinner } from 'components/share'
import SwitchLink from 'components/UI/Buttons/SwitchLink'
import styles from 'assets/styles/pages/userSection.module.scss'

function UserFollowersSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const lastPath = pathnames[pathnames.length - 1]
  const [loading, setLoading] = useState(false)
  const [followList, setFollowList] = useState([])
  const fieldName = (function getFieldNameByLastPath() {
    return lastPath === 'followings' ? 'followingId' : 'followerId'
  })()

  useEffect(() => {
    async function getFollowListData() {
      // show Spinner
      setLoading(true)
      // get data
      const { success, data, message } = await getUserInfoData(lastPath, userId)
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setFollowList(data)
      } else {
        // handle error
        console.error(message)
      }
    }
    getFollowListData()
  }, [lastPath])

  async function handleToggleFollow(userId, isFollowed) {
    const { success, message } = isFollowed
      ? await unfollowUser(userId)
      : await followUser(userId)
    if (success) {
      setFollowList((draft) =>
        draft.map((user) =>
          user.id === userId ? { ...user, isFollowed: !user.isFollowed } : user
        )
      )
    } else {
      console.error(message)
    }
  }

  // map userList
  const listData = followList.map((user, index) => {
    // check if login user
    if (user[fieldName] === currentUser.id) user.isLoginUser = true
    return (
      <FollowUserCard
        key={user.fieldName || index}
        user={user}
        onChange={handleToggleFollow}
        targetId={user[fieldName]}
      />
    )
  })
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.switchWrapper}>
        <SwitchLink text="追隨者" to={`/user/${userId}/followers`} />
        <SwitchLink text="正在追隨" to={`/user/${userId}/followings`} />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="scrollbar" onClick={handleUserOrTweetClick}>
          {listData}
        </ul>
      )}
    </section>
  )
}

export default UserFollowersSection
