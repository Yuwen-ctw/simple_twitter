import { UserAvatar, UserNameText, FollowingCheckbox } from 'components/share'
import styles from 'assets/styles/components/userCards/popularUserCard.module.scss'

function PopularUserCard({ popularUser, onChange, isFollowing }) {
  const { name, avatar, account, id, isLoginUser } = popularUser

  return (
    <li className={styles.layout} data-userid={id} data-click>
      <UserAvatar src={avatar} />
      <UserNameText name={name} />
      <span data-rolename="account">@{account}</span>
      <FollowingCheckbox
        userId={id}
        isFollowing={isFollowing}
        onChange={onChange}
        hide={isLoginUser}
      />
    </li>
  )
}

export default PopularUserCard
