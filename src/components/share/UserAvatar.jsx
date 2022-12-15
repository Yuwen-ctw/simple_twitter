import styles from 'assets/styles/components/share/avatars.module.scss'
import { defaultAvatar } from 'assets/images'
const UserAvatar = ({ src }) => {
  return (
    <div className={styles.userAvatar} data-rolename="avatarWrapper">
      <img
        src={src ? src : defaultAvatar}
        alt="avatar"
        data-rolename="avatar"
      />
    </div>
  )
}

export default UserAvatar
