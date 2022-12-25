import { forwardRef } from 'react'
import { SmallSpinner, UserAvatar } from 'components/share'
import { ClrButton } from 'components/UI/Buttons'
import styles from 'assets/styles/components/form/tweetInput.module.scss'
const TweetInput = forwardRef((props, ref) => {
  const {
    value,
    onChange,
    src,
    onClick,
    placeholder = '有什麼新鮮事？',
    buttonText = '推文',
    className,
    disabled,
    errMsg,
  } = props
  return (
    <div className={[styles.input__wrapper, className].join(' ')} ref={ref}>
      <UserAvatar src={src} />
      <textarea
        data-rolename="tweetInput"
        placeholder={placeholder}
        className={[styles.textInput]}
        id="profile-intro-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <span className={styles.errMsg}>{errMsg}</span>
      <ClrButton
        text={
          disabled ? <SmallSpinner classname={styles.smSpinner} /> : buttonText
        }
        className={styles.btn}
        onClick={onClick}
      />
    </div>
  )
})
TweetInput.displayName = 'TweetInput'
export default TweetInput
