import styles from 'assets/styles/components/share/texts.module.scss'

const SubText = ({ text }) => (
  <span className={styles.subText} data-rolename="account">
    {text}
  </span>
)

export default SubText
