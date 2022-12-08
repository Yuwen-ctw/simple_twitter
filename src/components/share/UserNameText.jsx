import styles from 'assets/styles/components/share/texts.module.scss'

const UserNameText = ({ name }) => (
  <span className={styles.userNameText}>{name}</span>
)

export default UserNameText
