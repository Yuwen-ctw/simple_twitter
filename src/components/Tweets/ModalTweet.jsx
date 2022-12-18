import {
  ContentText,
  ReplyTargetText,
  SubText,
  UserAvatar,
  UserNameText,
} from 'components/share'
import formatRelativeTime from 'uitlities/formatRelativeTime'
import styles from 'assets/styles/components/tweets/modalTweet.module.scss'

function ModalTweet({ tweet }) {
  return (
    <div className={styles.layout}>
      <div className={styles.connectLine} />
      <UserAvatar src={tweet?.User?.src} />
      <UserNameText name={tweet?.User?.name} />
      <SubText
        text={`@${tweet?.User?.account}·${formatRelativeTime(
          tweet?.createdAt
        )}`}
      />
      <ContentText text={tweet?.description} />
      <ReplyTargetText name={tweet?.User?.name} preText="回覆給" />
    </div>
  )
}
export default ModalTweet
