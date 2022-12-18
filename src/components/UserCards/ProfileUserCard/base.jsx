import { useState } from 'react'
import { BaseButton } from 'components/UI/Buttons'
import { FollowingCheckbox } from 'components/share'
import styles from 'assets/styles/components/userCards/profileUserCard.module.scss'

const ProfileBackground = ({ src }) => (
  <div className={styles.background}>
    <img src={src} alt="profile background" />
  </div>
)

const ProfileNameText = ({ name }) => <p className={styles.name}>{name}</p>

const IntroText = ({ text }) => <p className={styles.intro}>{text}</p>

const Interactions = ({ onToggle, user }) => {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <>
      <a href={`mailto:${user.email}`} className={styles.mailTo} />
      <button
        aria-label="notifaction"
        aria-pressed={isPressed}
        className={styles.notifaction}
        // TODO notifaction logic
        onClick={() => setIsPressed(!isPressed)}
      />
      <FollowingCheckbox
        userId={user.id}
        isFollowed={user.isFollowed}
        onChange={onToggle}
      />
    </>
  )
}

const ButtonGroup = ({ user, onToggle, onClickEdit, className }) => {
  let result
  if (user.self) {
    result = <BaseButton text="編輯個人資料" onClick={onClickEdit} />
  } else {
    result = <Interactions user={user} onToggle={onToggle} />
  }

  return (
    <div className={[styles.buttonGroup, className].join(' ')}>{result}</div>
  )
}

export { ProfileBackground, ProfileNameText, IntroText, ButtonGroup }
