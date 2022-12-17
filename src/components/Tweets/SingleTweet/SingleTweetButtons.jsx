import { replySvg } from 'assets/svgs'
import { likingSvg, likeSvg } from 'assets/svgs'
function SingleTweetButtons({
  className,
  isLiked,
  onReplyClick,
  onLikeClick,
  tweetId,
}) {
  return (
    <>
      <div className={className}>
        <button onClick={onReplyClick}>
          <img src={replySvg} alt="reply" />
        </button>
        <button onClick={() => onLikeClick(tweetId, isLiked)}>
          <img src={isLiked ? likingSvg : likeSvg} alt="like" />
        </button>
      </div>
    </>
  )
}
export default SingleTweetButtons
