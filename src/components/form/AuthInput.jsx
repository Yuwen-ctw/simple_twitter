import styles from '../../assets/styles/components/form/authInput.module.scss'
import { forwardRef } from 'react'


const AuthContainer = ({ children }) => (
  <div className={styles.AuthContainer}>{children}</div>
)

const AccountInput = forwardRef((props, ref)=>{
  const {value,placeholder,onChange,errorMessage} = props
  return(
    <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-account-input">帳號</label>
      <input
        className={styles.textInput}
        id="profile-account-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange( e.target.value)}
        max={10}
      /> 
      <div className={styles.underline}></div>   
        <span className={styles.error}>{errorMessage}</span>
        <span className={styles.maxLen}>{value?.length}/10</span>
         </div>

  )
})

const NameInput = forwardRef((props, ref)=>{
  const {value,onChange,placeholder,errorMessage} = props
  return(
      <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-name-input">帳號</label>
      <input
        className={styles.textInput}
        id="profile-name-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange( e.target.value)}
        max={10}
      />
      <div className={styles.underline}></div> 
      <span className={styles.error}>{errorMessage}</span>
      <span className={styles.maxLen}>{value?.length}/50</span>
    </div>
  )
})

const EmailInput = forwardRef((props, ref)=>{
  const {value,onChange,placeholder,errorMessage} = props
  return(
      <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-email-input">Email</label>
      <input
        className={styles.textInput}
        id="profile-email-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange( e.target.value)}
      />
      <div className={styles.underline}></div> 
      <span className={styles.error}>{errorMessage}</span>
    </div>
  )
})

const PasswordInput = forwardRef((props, ref)=>{
  const {value,onChange,type,placeholder,errorMessage} = props
  return(
      <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-password-input">密碼</label>
      <input
        className={styles.textInput}
        id="profile-password-input"
        value={value}
        placeholder={placeholder}
        type={type || 'text'}
        onChange={(e) => onChange( e.target.value)}
      />
      <div className={styles.underline}></div>
      <span className={styles.error}>{errorMessage}</span>
    </div>
  )
  })

AccountInput.displayName = 'AccountInput'
NameInput.displayName = 'NameInput'
EmailInput.displayName = 'EmailInput'
PasswordInput.displayName = 'PasswordInput'


export {AuthContainer,AccountInput,NameInput,EmailInput,PasswordInput} 
