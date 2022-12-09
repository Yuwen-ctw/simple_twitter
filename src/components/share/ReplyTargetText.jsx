import styles from 'assets/styles/components/share/texts.module.scss'

const ReplyTargetText = ({ name }) => (
  <span className={styles.replyTargetText}>
    回覆 <span>@{name}</span>
  </span>
)

export default ReplyTargetText
