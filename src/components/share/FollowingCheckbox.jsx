import styles from 'assets/styles/components/share/followingCheckbox.module.scss'

const FollowingCheckbox = ({
  userId,
  isFollowed,
  onChange,
  hide,
  uniqueId = 'profile',
}) => {
  if (hide) return
  const text = isFollowed ? '正在跟隨' : '跟隨'
  return (
    <div className={styles.followingCheckbox}>
      <input
        type="checkbox"
        value="true"
        id={`${uniqueId}-${userId}`}
        checked={isFollowed === true}
        onChange={() => onChange(userId, isFollowed)}
      />
      <label htmlFor={`${uniqueId}-${userId}`}>{text}</label>
    </div>
  )
}
export default FollowingCheckbox
