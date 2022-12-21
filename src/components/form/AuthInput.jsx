import styles from '../../assets/styles/components/form/authInput.module.scss'
import { forwardRef } from 'react'

const AuthContainer = ({ children }) => (
  <form className={styles.AuthContainer} autoComplete="off">
    {children}
  </form>
)

const AuthInput = forwardRef((props, ref) => {
  const { value, placeholder, onChange, showErr, label, type, state } = props
  return (
    <div className={styles.input__wrapper} ref={ref}>
      <label>{label}</label>
      <input
        className={styles.textInput}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        max={50}
      />

      <u className={styles.underline}></u>
      <span className={styles.error}>{state ? '字數超過五十字' : ''}</span>
      <span className={styles.error}>{showErr ? '帳號不存在' : ''}</span>
      <span className={styles.maxLen}>{value?.length}/50</span>
    </div>
  )
})

AuthInput.displayName = 'AuthInput'

export { AuthContainer, AuthInput }
