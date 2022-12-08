import styles from 'assets/styles/components/share/avatars.module.scss'

const UserAvatar = ({ src }) => (
  <div className={styles.userAvatar}>
    <img src={src} alt="avatar" />
  </div>
)

export default UserAvatar
