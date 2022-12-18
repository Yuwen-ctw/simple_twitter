import { UserNameText, SubText, UserAvatar } from 'components/share'
import SingleTweetInfo from './SingleTweetInfo'
import SingleTweetButtons from './SingleTweetButtons'
import styles from 'assets/styles/components/tweets/singleTweet.module.scss'
import formatCreateTime from 'uitlities/formatCreateTime'
import { Link } from 'react-router-dom'

function SingleTweet({ tweet, onLikeClick, onReplyClick }) {
  const { id, description, replyCount, likeCount, createdAt, User, isLiked } =
    tweet
  return (
    <li className={styles.layout}>
      <Link to={`/user/${User?.id}/tweets`}>
        <UserAvatar src={User?.avatar} />
      </Link>
      <div>
        <UserNameText name={User?.name} />
        <SubText text={`@${User?.account}`} />
      </div>
      <p className={styles.contentText}>{description}</p>
      <p className={styles.timeText}>{formatCreateTime(createdAt)}</p>
      <SingleTweetInfo
        className={styles.tweetInfo}
        replyCount={replyCount}
        likeCount={likeCount}
      />
      <SingleTweetButtons
        className={styles.tweetButtons}
        isLiked={isLiked}
        onReplyClick={() => onReplyClick(tweet)}
        onLikeClick={onLikeClick}
        tweetId={id}
      />
    </li>
  )
}

export default SingleTweet
