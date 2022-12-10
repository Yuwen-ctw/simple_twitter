const FollowingCheckbox = ({ userId, isFollowing, onChange }) => {
  const text = isFollowing ? '正在跟隨' : '跟隨'
  return (
    <div>
      <input
        type="checkbox"
        id={`ppl-${userId}`}
        checked={isFollowing}
        onChange={() => onChange(userId, isFollowing)}
      />
      <label htmlFor={`ppl-${userId}`}>{text}</label>
    </div>
  )
}
export default FollowingCheckbox
