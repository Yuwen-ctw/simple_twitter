import styles from 'assets/styles/components/share/texts.module.scss'

const UserNameText = ({ name }) => (
  <span className={styles.userNameText} data-rolename="name">
    {name}
  </span>
)

export default UserNameText
