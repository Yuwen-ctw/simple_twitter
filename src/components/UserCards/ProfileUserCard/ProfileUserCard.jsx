import { useNavigate } from 'react-router-dom'
import { ProfileAvatar, SubText, UserFollowInfo } from 'components/share'
import {
  ProfileBackground,
  ProfileNameText,
  IntroText,
  ButtonGroup,
} from './base'
import styles from 'assets/styles/components/userCards/profileUserCard.module.scss'

function ProfileUserCard({ user, onClickEdit, onToggleFollow, className }) {
  const navigate = useNavigate()

  function handleFollowInfoClick(target) {
    navigate(`/user/${user.id}/${target}`)
  }

  return (
    <div className={[styles.layout, className].join(' ')}>
      <ProfileBackground src={user.cover} />
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
        followerCount={user.followerCount}
        userId={user.id}
        onClick={handleFollowInfoClick}
      />
    </div>
  )
}

export default ProfileUserCard
