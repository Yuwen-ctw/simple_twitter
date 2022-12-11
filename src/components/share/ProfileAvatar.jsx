import styles from 'assets/styles/components/share/avatars.module.scss'

const ProfileAvatar = ({ src, className }) => (
  <div className={[styles.profileAvatar, className].join(' ')}>
    <img src={src} alt="avatar" />
  </div>
)

export default ProfileAvatar
