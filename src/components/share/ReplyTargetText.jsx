import styles from 'assets/styles/components/share/texts.module.scss'

const ReplyTargetText = ({ name, preText = '回覆' }) => (
  <span className={styles.replyTargetText}>
    {preText} <span>@{name}</span>
  </span>
)

export default ReplyTargetText
