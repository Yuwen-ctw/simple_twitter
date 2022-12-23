import styles from '../../assets/styles/components/form/authInput.module.scss'

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
    <div
      className={[
        styles.input__wrapper,
        errMsg?.length > 0 && styles.invalid,
      ].join(' ')}
    >
      <label htmlFor={`auth-${inputName}-input`}>{labelName}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={`auth-${inputName}-input`}
        className={styles.input}
        value={value}
        onChange={(e) => onChange({ type: inputName, payload: e.target.value })}
        autoComplete="off"
        disabled={disabled}
      />
      <span className={styles.error}>{errMsg}</span>
      {inputName === 'name' && (
        <span className={styles.maxLen}>{value?.length}/50</span>
      )}
    </div>
  )
}

export default AuthInput
