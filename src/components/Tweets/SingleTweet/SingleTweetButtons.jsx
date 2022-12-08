import { replySvg } from 'assets/svgs'
function SingleTweetButtons({ className, isLike, onReplyClick, onLikeClick }) {
  return (
    <>
      <div className={className}>
        <button onClick={onReplyClick}>
          <img src={replySvg} alt="reply" />
        </button>
        <input
          type="checkbox"
          id="like-checkbox"
          defaultChecked={isLike}
          onChange={onLikeClick}
        />
        <label htmlFor="like-checkbox" tabIndex={0}></label>
      </div>
    </>
  )
}
export default SingleTweetButtons
