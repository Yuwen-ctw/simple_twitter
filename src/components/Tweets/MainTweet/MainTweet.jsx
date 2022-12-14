import {
  UserNameText,
  SubText,
  ContentText,
  UserAvatar,
} from 'components/share'
import TweetInfo from './TweetInfo'
import styles from 'assets/styles/components/tweets/mainTweet.module.scss'
import formatRelativeTime from 'uitlities/formatRelativeTime'

function MainTweet({ tweet, onLikeClick, onReplyClick }) {
  const {
    id: tweetId,
    User,
    createdAt,
    description,
    replyCount,
    likeCount,
    isLiked,
  } = tweet

  return (
    <li
      className={styles.layout}
      data-tweetid={tweetId}
      data-userid={User.id}
      data-click
    >
      <UserAvatar src={User.avatar} />
      <UserNameText name={User.name} />
      <SubText text={` @${User.account}．${formatRelativeTime(createdAt)}`} />
      <ContentText text={description} />
      <TweetInfo
        className={styles.tweetInfo}
        replyCount={replyCount}
        likeCount={likeCount}
        onReplyClick={onReplyClick}
        onLikeClick={onLikeClick}
        isLike={isLiked}
        id={tweetId}
      />
    </li>
  )
}

export default MainTweet
