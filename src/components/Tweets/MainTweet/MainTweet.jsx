import {
  UserNameText,
  SubText,
  ContentText,
  UserAvatar,
} from 'components/share'
import TweetInfo from './TweetInfo'
import styles from 'assets/styles/components/tweets/mainTweet.module.scss'

function MainTweet({ tweet }) {
  const { name, account, postTime, content, avatar, replyAmount, likeAmount } =
    tweet
  return (
    <li className={styles.layout}>
      <UserAvatar src={avatar} />
      <div>
        <UserNameText text={name} />
        <SubText text={` @${account}．${postTime}`} />
      </div>
      <ContentText text={content} />
      <TweetInfo
        className={styles.tweetInfo}
        replyAmount={replyAmount}
        likeAmount={likeAmount}
        onReplyClick={() => ''}
        onLikeClick={() => ''}
      />
    </li>
  )
}

export default MainTweet
