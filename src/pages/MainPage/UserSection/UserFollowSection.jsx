import { useEffect, useState } from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { getUserInfoData } from 'api/users'
import { FollowUserCard } from 'components/UserCards/index'
import { Spinner } from 'components/share'
import SwitchLink from 'components/UI/Buttons/SwitchLink'
import styles from 'assets/styles/pages/userSection.module.scss'
import { useFollowToggled } from 'contexts/FollowToggledContext'

function UserFollowersSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const fieldName = pathnames[pathnames.length - 1]
  const [loading, setLoading] = useState(false)
  const [followList, setFollowList] = useState([])

  useEffect(() => {
    async function getFollowListData() {
      // show Spinner
      setLoading(true)
      // get data
      const { success, data, message } = await getUserInfoData(
        fieldName,
        userId
      )
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
  }, [fieldName])

  function updateFollowList(targetUser) {
    setFollowList((draft) =>
      draft.map((user) =>
        user.id === targetUser.id
          ? { ...user, isFollowed: !user.isFollowed }
          : user
      )
    )
  }
  // update data wherever user changed the follow state
  useEffect(() => updateFollowList(toggledUser), [toggledUser])

  // map userList
  const listData = followList.map((user) => {
    // check if login user
    if (user.id === currentUser.id) user.isLoginUser = true
    return (
      <FollowUserCard key={user.id} user={user} onChange={handleToggleFollow} />
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
