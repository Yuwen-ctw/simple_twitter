import {
  UserAvatar,
  UserNameText,
  FollowingCheckbox,
  ContentText,
} from 'components/share'
import styles from 'assets/styles/components/userCards/followUserCard.module.scss'

function FollowUserCard({ user, onChange, isFollowing }) {
  const { avatar, name, id, intro, isLoginUser } = user
  return (
    <li className={styles.layout}>
      <UserAvatar src={avatar} />
      <UserNameText name={name} />
      {!isLoginUser && (
        <FollowingCheckbox
          userId={id}
          isFollowing={isFollowing}
          onChange={onChange}
        />
      )}

      <ContentText text={intro} />
    </li>
  )
}

export default FollowUserCard
