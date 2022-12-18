import { ProfileAvatar, SubText, UserFollowInfo } from 'components/share'
import {
  ProfileBackground,
  ProfileNameText,
  IntroText,
  ButtonGroup,
} from './base'
import { SwitchLink } from 'components/UI/Buttons'
import styles from 'assets/styles/components/userCards/profileUserCard.module.scss'
// import db from 'db.json'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfileUserCard({ user, onClickEdit, onToggleFollow }) {
  const navigate = useNavigate()
  // const [followings, setFollowings] = useState(db.loginUser.Followings)
  // user.isFollowing = followings.includes(user.id)

  // const handleToggleFollow = (targetUserId, isFollowing) => {
  //   // TODO send api
  //   const nextFollowings = [...followings]
  //   // handle follow
  //   if (!isFollowing) {
  //     // avoid to add same id
  //     return (
  //       !nextFollowings.includes(targetUserId) &&
  //       setFollowings([...nextFollowings, targetUserId])
  //     )
  //   }
  //   // handle cancel
  //   // TODO send api
  //   setFollowings(nextFollowings.filter((id) => id !== targetUserId))
  // }

  function handleFollowInfoClick(target) {
    navigate(`/user/${user.id}/${target}`)
  }

  return (
    <div className={styles.layout}>
      <ProfileBackground src={user.src} />
      <ProfileAvatar src={user.avatar} className={styles.avatar} />
      <ButtonGroup
        user={user}
        onToggle={onToggleFollow}
        onClickEdit={onClickEdit}
        className={user.id ? '' : styles.hide}
      />
      <ProfileNameText name={user.name} />
      <SubText text={`@${user.account}`} />
      <IntroText text={user.introduction} />
      <UserFollowInfo
        followingCount={user.followingCount}
        followerCount={user.follwerCount}
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
