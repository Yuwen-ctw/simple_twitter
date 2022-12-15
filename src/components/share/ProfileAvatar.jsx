import styles from 'assets/styles/components/share/avatars.module.scss'
import { defaultAvatar } from 'assets/images'
const ProfileAvatar = ({ src, className }) => {
  return (
    <div className={[styles.profileAvatar, className].join(' ')}>
      <img src={src ? src : defaultAvatar} alt="avatar" />
    </div>
  )
}

export default ProfileAvatar
