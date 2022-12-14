import { replySvg } from 'assets/svgs'
import { likingSvg, likeSvg } from 'assets/svgs'
function SingleTweetButtons({ className, isLike, onReplyClick, onLikeClick }) {
  return (
    <>
      <div className={className}>
        <button onClick={onReplyClick}>
          <img src={replySvg} alt="reply" />
        </button>
        <button onClick={onLikeClick}>
          <img src={isLike ? likingSvg : likeSvg} alt="like" />
        </button>
      </div>
    </>
  )
}
export default SingleTweetButtons
