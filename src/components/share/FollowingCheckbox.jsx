import styles from 'assets/styles/components/share/followingCheckbox.module.scss'
const FollowingCheckbox = ({ userId, isFollowed, onChange, hide }) => {
  if (hide) return
  const text = isFollowed ? '正在跟隨' : '跟隨'
  return (
    <div className={styles.followingCheckbox}>
      <input
        type="checkbox"
        id={`ppl-${userId}`}
        checked={isFollowed}
        onChange={() => onChange(userId, isFollowed)}
      />
      <label htmlFor={`ppl-${userId}`}>{text}</label>
    </div>
  )
}
export default FollowingCheckbox
