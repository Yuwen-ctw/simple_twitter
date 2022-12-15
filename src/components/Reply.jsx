import {
  ContentText,
  ReplyTargetText,
  SubText,
  UserAvatar,
  UserNameText,
} from './share'
import styles from 'assets/styles/components/reply.module.scss'

function Reply({ reply }) {
  return (
    <li className={styles.layout} data-userid={reply.userId} data-click>
      <UserAvatar src={reply.avatar} />
      <UserNameText name={reply.name} />
      <SubText text={`@${reply.account}．${reply.time}`} />
      <ReplyTargetText name={reply.target} />
      <ContentText text={reply.content} />
    </li>
  )
}

export default Reply
