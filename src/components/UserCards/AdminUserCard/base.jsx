import { defaultAvatar } from 'assets/images'

const AdminCardAvatar = ({ src, className }) => (
  <div className={className}>
    <img src={src ? src : defaultAvatar} alt="avatar" />
  </div>
)

const UserTweetInfo = ({ tweetCount, likeCount, className }) => (
  <div className={className}>
    <span>{tweetCount}</span>
    <span>{likeCount}</span>
  </div>
)

const AdminCardBackground = ({ src, className }) => (
  <div className={className}>
    <img src={src} alt="profile background" />
  </div>
)

export { AdminCardAvatar, UserTweetInfo, AdminCardBackground }
