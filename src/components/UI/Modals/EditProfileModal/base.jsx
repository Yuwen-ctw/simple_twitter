import styles from 'assets/styles/components/modals/editProfileModal.module.scss'
import { ProfileAvatar } from 'components/share'

import { forwardRef } from 'react'

const ProfileAvatarInput = ({ src, className, onChange }) => {
  return (
    <div className={styles.avatarWrapper}>
      <ProfileAvatar src={src} className={className} />
      <label htmlFor="profile-avatar-input" />
      <input
        type="file"
        id="profile-avatar-input"
        accept="image/*"
        onChange={(e) => onChange('avatar', e.target.files)}
      />
    </div>
  )
}

const ProfileCoverInput = ({ src, onChange, onDiscard }) => {
  return (
    <div className={styles.coverWrapper}>
      <img className={styles.cover} src={src} alt="請上傳個人頁面橫幅背景" />
      <label htmlFor="profile-cover-input" />
      <label className={styles.discardBtn} onClick={onDiscard} />
      <input
        type="file"
        id="profile-cover-input"
        accept="image/*"
        onChange={(e) => onChange('cover', e.target.files)}
      />
    </div>
  )
}

const NameInput = forwardRef((props, ref) => {
  const { value, onChange } = props
  return (
    <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-name-input">名稱</label>
      <input
        className={styles.nameInput}
        id="profile-name-input"
        value={value}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <span className={styles.error}>字數超出上限！</span>
      <span className={styles.maxLen}>{value?.length}/50</span>
    </div>
  )
})

const IntroInput = forwardRef((props, ref) => {
  const { value, onChange } = props
  return (
    <div className={styles.input__wrapper} ref={ref}>
      <label htmlFor="profile-intro-input">自我介紹</label>
      <textarea
        className={styles.introInput}
        id="profile-intro-input"
        value={value}
        onChange={(e) => onChange('introduction', e.target.value)}
        max={160}
      />
      <span className={styles.error}>字數超出上限！</span>
      <span className={styles.maxLen}>{props.value?.length}/160</span>
    </div>
  )
})

NameInput.displayName = 'NameInput'
IntroInput.displayName = 'IntroInput'

export { ProfileCoverInput, NameInput, IntroInput, ProfileAvatarInput }
