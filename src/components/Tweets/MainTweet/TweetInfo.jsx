import { replySvg, likeSvg, likingSvg } from 'assets/svgs/index'

const TweetInfo = ({
  id,
  className,
  replyAmount,
  likeAmount,
  onReplyClick,
  onLikeClick,
  isLike,
}) => (
  <div className={className}>
    <button onClick={onReplyClick}>
      <img src={replySvg} alt="reply" />
      <span>{replyAmount}</span>
    </button>
    <button onClick={() => onLikeClick(id, isLike)}>
      <img src={isLike ? likingSvg : likeSvg} alt="like" />
      <span>{likeAmount}</span>
    </button>
  </div>
)

export default TweetInfo
