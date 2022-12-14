import styles from 'assets/styles/components/share/avatars.module.scss'

const UserAvatar = ({ src }) => (
  <div className={styles.userAvatar} data-rolename="avatarWrapper">
    <img src={src} alt="avatar" data-rolename="avatar" />
  </div>
)

export default UserAvatar
