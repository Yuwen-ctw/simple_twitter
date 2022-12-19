import {
  UserAvatar,
  UserNameText,
  FollowingCheckbox,
  ContentText,
} from 'components/share'
import styles from 'assets/styles/components/userCards/followUserCard.module.scss'

function FollowUserCard({ user, onChange, targetId }) {
  const { avatar, name, introduction, isLoginUser, isFollowed } = user

  return (
    <li className={styles.layout} data-userid={targetId} data-click>
      <UserAvatar src={avatar} />
      <UserNameText name={name} />
      <FollowingCheckbox
        userId={targetId}
        isFollowed={isFollowed}
        onChange={onChange}
        hide={isLoginUser}
      />

      <ContentText text={introduction} />
    </li>
  )
}

export default FollowUserCard
