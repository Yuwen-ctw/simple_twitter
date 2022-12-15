import styles from '../../assets/styles/components/form/auth.module.scss'

const AuthContainer = ({ children }) => (
  <form className={styles.AuthContainer}>{children}</form>
)

const AuthInputContainer = ({ children }) => {
  return <div className={styles.AuthInputContainer}>{children}</div>
}

export { AuthContainer, AuthInputContainer }
