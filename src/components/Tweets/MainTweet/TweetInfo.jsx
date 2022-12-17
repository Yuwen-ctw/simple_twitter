import { replySvg, likeSvg, likingSvg } from 'assets/svgs/index'

const TweetInfo = ({
  id,
  className,
  replyCount,
  likeCount,
  onReplyClick,
  onLikeClick,
  isLiked,
}) => (
  <div className={className}>
    <button onClick={onReplyClick}>
      <img src={replySvg} alt="reply" />
      <span>{replyCount || '0'}</span>
    </button>
    <button onClick={() => onLikeClick(id, isLiked)}>
      <img src={isLiked ? likingSvg : likeSvg} alt="like" />
      <span>{likeCount || '0'}</span>
    </button>
  </div>
)

export default TweetInfo
