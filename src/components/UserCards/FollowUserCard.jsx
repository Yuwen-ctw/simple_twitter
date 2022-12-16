import {
  UserAvatar,
  UserNameText,
  FollowingCheckbox,
  ContentText,
} from 'components/share'
import styles from 'assets/styles/components/userCards/followUserCard.module.scss'

function FollowUserCard({ user, onChange, isFollowing }) {
  const { avatar, name, id, introduction, isLoginUser } = user
  return (
    <li className={styles.layout} data-userid={id} data-click>
      <UserAvatar src={avatar} />
      <UserNameText name={name} />
      <FollowingCheckbox
        userId={id}
        isFollowing={isFollowing}
        onChange={onChange}
        hide={isLoginUser}
      />

      <ContentText text={introduction} />
    </li>
  )
}

export default FollowUserCard
