import styles from 'assets/styles/components/share/texts.module.scss'

const ContentText = ({ text }) => (
  <p className={styles.contentText} data-rolename="content">
    {text}
  </p>
)

export default ContentText
