import { useEffect, useState } from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { useFollowToggled } from 'contexts/FollowToggledContext'
import useFetch from 'customHooks/useFetch'
import { getUserInfoData } from 'api/users'
import { FollowUserCard } from 'components/UserCards/index'
import { Spinner } from 'components/share'
import SwitchLink from 'components/UI/Buttons/SwitchLink'
import styles from 'assets/styles/pages/userSection.module.scss'

function UserFollowersSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { currentUser } = useAuth()
  const { toggledUser, handleToggleFollow } = useFollowToggled()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const fieldName = pathnames[pathnames.length - 1]
  const [followList, setFollowList] = useState([])
  const { data, loading, refetch } = useFetch(getUserInfoData, {
    fieldName,
    userId,
  })

  useEffect(() => {
    if (!data) return
    setFollowList(data)
  }, [loading])

  // effect from switch route
  useEffect(() => {
    if (!data) return
    refetch(getUserInfoData, {
      fieldName,
      userId,
    })
  }, [fieldName])

  // update data wherever user changed the follow state
  useEffect(() => updateFollowList(toggledUser), [toggledUser])

  function updateFollowList(targetUser) {
    setFollowList((draft) =>
      draft.map((user) =>
        user.id === targetUser.id
          ? { ...user, isFollowed: !user.isFollowed }
          : user
      )
    )
  }

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
      <div className={[styles.switchers, styles.switcherTopBorder].join(' ')}>
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
