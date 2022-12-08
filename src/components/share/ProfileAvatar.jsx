import styles from 'assets/styles/components/share/avatars.module.scss'

const ProfileAvatar = ({ src }) => (
  <div className={styles.profileAvatar}>
    <img src={src} alt="avatar" />
  </div>
)

export default ProfileAvatar
