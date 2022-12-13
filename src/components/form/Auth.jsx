import styles from '../../assets/styles/components/form/auth.module.scss'

const AuthContainer = ({ children }) => (
  <div className={styles.AuthContainer}>{children}</div>
)

const AuthInputContainer = ({ children }) => {
  return <div className={styles.AuthInputContainer}>{children}</div>
}

export { AuthContainer, AuthInputContainer }
