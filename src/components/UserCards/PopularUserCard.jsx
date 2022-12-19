import { UserAvatar, UserNameText, FollowingCheckbox } from 'components/share'
import styles from 'assets/styles/components/userCards/popularUserCard.module.scss'

function PopularUserCard({ popularUser, onChange }) {
  const { name, avatar, account, id, isFollowed, isLoginUser } = popularUser

  return (
    <li className={styles.layout} data-userid={id} data-click>
      <UserAvatar src={avatar} />
      <UserNameText name={name} />
      <span data-rolename="account">@{account}</span>
      <FollowingCheckbox
        userId={id}
        isFollowed={isFollowed}
        onChange={onChange}
        hide={isLoginUser}
      />
    </li>
  )
}

export default PopularUserCard
