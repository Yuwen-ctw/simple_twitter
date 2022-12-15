import styles from '../../assets/styles/components/form/authInput.module.scss'

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <>
      <div className={styles.input_wrapper}>
        <div className={styles.label}>{label}</div>
        <input
          className={styles.input_text}
          type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          max={10}
        />
        <span className={styles.error}>帳號不存在</span>
        <span className={styles.error}>字數超出上限！</span>
        <span className={styles.maxLen}>{value?.length}/10</span>
      </div>
    </>
  )
}

export default AuthInput
