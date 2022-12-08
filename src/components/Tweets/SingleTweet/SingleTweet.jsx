import { UserNameText, SubText, UserAvatar } from 'components/share'
import SingleTweetInfo from './SingleTweetInfo'
import SingleTweetButtons from './SingleTweetButtons'
import styles from 'assets/styles/components/tweets/singleTweet.module.scss'

function SingleTweet({ tweet }) {
  const { name, account, postTime, content, avatar, replyAmount, likeAmount } =
    tweet
  return (
    <li className={styles.layout}>
      <UserAvatar src={avatar} />
      <div>
        <UserNameText name={name} />
        <SubText text={`@${account}`} />
      </div>
      <p className={styles.contentText}>{content}</p>
      <p className={styles.timeText}>{postTime}</p>
      <SingleTweetInfo
        className={styles.tweetInfo}
        replyAmount={replyAmount}
        likeAmount={likeAmount}
      />
      <SingleTweetButtons
        className={styles.tweetButtons}
        isLike={''}
        onReplyClick={() => ''}
        onLikeClick={() => ''}
      />
    </li>
  )
}

export default SingleTweet
