import styles from '../../assets/styles/components/form/authInput.module.scss'

const AuthContainer = ({ children }) => (
  <form className={styles.AuthContainer} autoComplete="off">
    {children}
  </form>
)

const AuthInput = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled,
  errMsg,
  labelName,
  inputName,
}) => {
  return (
    <div className={styles.input__wrapper}>
      <label htmlFor={`auth-${inputName}-input`}>{labelName}</label>
      <input
        className={styles.textInput}
        id={`auth-${inputName}-input`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange({ type: inputName, payload: e.target.value })}
        disabled={disabled}
        type={type}
        autoComplete="off"
      />
      <div className={styles.underline}></div>
      <span className={styles.error}>{errMsg}</span>
      {inputName === 'name' && (
        <span className={styles.maxLen}>{value?.length}/50</span>
      )}
    </div>
  )
}

export { AuthContainer, AuthInput }
