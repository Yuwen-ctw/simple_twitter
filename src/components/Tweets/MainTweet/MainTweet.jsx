import {
  UserNameText,
  SubText,
  ContentText,
  UserAvatar,
} from 'components/share'
import TweetInfo from './TweetInfo'
import styles from 'assets/styles/components/tweets/mainTweet.module.scss'

function MainTweet({ tweet, onLikeClick, onReplyClick }) {
  const { id, User, createdAt, description, replyCount, likeCount, isLiked } =
    tweet
  return (
    <li className={styles.layout}>
      <UserAvatar src={User.avatar} />
      <div>
        <UserNameText name={User.name} />
        <SubText text={` @${User.account}．${createdAt}`} />
      </div>
      <ContentText text={description} />
      <TweetInfo
        className={styles.tweetInfo}
        replyCount={replyCount}
        likeCount={likeCount}
        onReplyClick={onReplyClick}
        onLikeClick={onLikeClick}
        isLike={isLiked}
        id={id}
      />
    </li>
  )
}

export default MainTweet
