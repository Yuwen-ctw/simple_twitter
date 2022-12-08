import { replySvg, likeSvg } from 'assets/svgs/index'

const TweetInfo = ({
  className,
  replyAmount,
  likeAmount,
  onReplyClick,
  onLikeClick,
}) => (
  <div className={className}>
    <button onClick={onReplyClick}>
      <img src={replySvg} alt="reply" />
      <span>{replyAmount}</span>
    </button>
    <button onClick={onLikeClick}>
      <img src={likeSvg} alt="like" />
      <span>{likeAmount}</span>
    </button>
  </div>
)

export default TweetInfo
