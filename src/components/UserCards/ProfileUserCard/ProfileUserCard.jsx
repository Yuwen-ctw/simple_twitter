import { ProfileAvatar, SubText, UserFollowInfo } from 'components/share'
import {
  ProfileBackground,
  ProfileNameText,
  IntroText,
  ButtonGroup,
} from './base'
import { SwitchLink } from 'components/UI/Buttons'
import styles from 'assets/styles/components/userCards/profileUserCard.module.scss'
import db from 'db.json'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileUserCard({ user, onClickEdit }) {
  const navigate = useNavigate()
  //TODO get current user info
  user.self = true
  const [followings, setFollowings] = useState(db.loginUser.Followings)
  user.isFollowing = followings.includes(user.id)

  const handleToggle = (targetUserId, isFollowing) => {
    // TODO send api
    const nextFollowings = [...followings]
    // handle follow
    if (!isFollowing) {
      // avoid to add same id
      return (
        !nextFollowings.includes(targetUserId) &&
        setFollowings([...nextFollowings, targetUserId])
      )
    }
    // handle cancel
    // TODO send api
    setFollowings(nextFollowings.filter((id) => id !== targetUserId))
  }

  function handleFollowInfoClick(target) {
    navigate(`/user/${user.id}/${target}`)
  }

  return (
    <div className={styles.layout}>
      <ProfileBackground src={user.src} />
      <ProfileAvatar src={user.avatar} className={styles.avatar} />
      <ButtonGroup
        user={user}
        onChange={handleToggle}
        onClickEdit={onClickEdit}
      />
      <ProfileNameText name={user.name} />
      <SubText text={`@${user.account}`} />
      <IntroText text={user.introduction} />
      <UserFollowInfo
        followingCount={user.Followings?.length}
        followerCount={user.Followers?.length}
        userId={user.id}
        onClick={handleFollowInfoClick}
      />
      <div className={styles.switcherWrapper}>
        <SwitchLink text="推文" to={`/user/${user.id}/tweets`} />
        <SwitchLink text="回覆" to={`/user/${user.id}/replies`} />
        <SwitchLink text="喜歡的內容" to={`/user/${user.id}/likes`} />
      </div>
    </div>
  )
}

export default ProfileUserCard
