import {
  ContentText,
  ReplyTargetText,
  SubText,
  UserAvatar,
  UserNameText,
} from './share'
import styles from 'assets/styles/components/reply.module.scss'
import formatRelativeTime from 'uitlities/formatRelativeTime'

function Reply({ reply }) {
  return (
    <li className={styles.layout} data-userid={reply.UserId} data-click>
      <UserAvatar src={reply?.User?.avatar} />
      <UserNameText name={reply?.User?.name} />
      <SubText
        text={`@${reply?.User?.account}．${formatRelativeTime(
          reply?.createdAt
        )}`}
      />
      <ReplyTargetText name={reply?.Tweet?.User?.account} />
      <ContentText text={reply?.comment} />
    </li>
  )
}

export default Reply
