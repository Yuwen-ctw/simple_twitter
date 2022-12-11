import { useState } from 'react'
import { BaseButton } from 'components/UI/Buttons'
import { FollowingCheckbox } from 'components/share'
import styles from 'assets/styles/components/userCards/profileUserCard.module.scss'

const ProfileBackground = ({ src }) => (
  <img className={styles.background} src={src} alt="profile background" />
)

const ProfileNameText = ({ name }) => <p className={styles.name}>{name}</p>

const IntroText = ({ text }) => <p className={styles.intro}>{text}</p>

const Interactions = ({ onChange, user }) => {
  const [isPressed, setIsPressed] = useState(false)
  return (
    <>
      <a href='mailto:"abc@gmail.com"' className={styles.mailTo} />
      <button
        aria-label="notifaction"
        aria-pressed={isPressed}
        className={styles.notifaction}
        // TODO notifaction logic
        onClick={() => setIsPressed(!isPressed)}
      />
      <FollowingCheckbox
        userId={user.id}
        isFollowing={user.isFollowing}
        onChange={onChange}
      />
    </>
  )
}

const ButtonGroup = ({ user, onChange }) => {
  let result
  if (user.self) {
    result = <BaseButton text="編輯個人資料" />
  } else {
    result = <Interactions user={user} onChange={onChange} />
  }

  return <div className={styles.buttonGroup}>{result}</div>
}

export { ProfileBackground, ProfileNameText, IntroText, ButtonGroup }