import { UserAvatar, UserNameText, FollowingCheckbox } from 'components/share'
import styles from 'assets/styles/components/userCards/popularUserCard.module.scss'

function PopularUserCard({ popularUser, onChange, isFollowing }) {
  const { name, avatar, account, id, isLoginUser } = popularUser

  return (
    <li className={styles.layout}>
      <UserAvatar src={avatar} />
      <div>
        <UserNameText name={name} />
        <p className={styles.subtext}>@{account}</p>
      </div>
      {!isLoginUser && (
        <FollowingCheckbox
          userId={id}
          isFollowing={isFollowing}
          onChange={onChange}
        />
      )}
    </li>
  )
}

export default PopularUserCard
