import {
  UserNameText,
  SubText,
  ContentText,
  UserAvatar,
} from 'components/share'
import TweetInfo from './TweetInfo'
import styles from 'assets/styles/components/tweets/mainTweet.module.scss'

function MainTweet({ tweet, onLikeClick, onReplyClick }) {
  const {
    id,
    name,
    account,
    postTime,
    content,
    avatar,
    replyAmount,
    likeAmount,
    isLike,
  } = tweet
  return (
    <li className={styles.layout}>
      <UserAvatar src={avatar} />
      <div>
        <UserNameText name={name} />
        <SubText text={` @${account}．${postTime}`} />
      </div>
      <ContentText text={content} />
      <TweetInfo
        className={styles.tweetInfo}
        replyAmount={replyAmount}
        likeAmount={likeAmount}
        onReplyClick={onReplyClick}
        onLikeClick={onLikeClick}
        isLike={isLike}
        id={id}
      />
    </li>
  )
}

export default MainTweet
