import { useRef, useState } from 'react'
import readImage from 'uitlities/readImage'
import {
  IntroInput,
  NameInput,
  ProfileCoverInput,
  ProfileAvatarInput,
} from './base'
import { defaultCover } from 'assets/images'
import styles from 'assets/styles/components/modals/editProfileModal.module.scss'
import Modal from '../share/Modal'
import { ClrButton } from 'components/UI/Buttons'

function EditProfileModal({ user, showModal, onClose, onSave }) {
  // store input valus
  const [inputValues, setInputValues] = useState({
    name: user.name,
    intro: user.intro,
    cover: defaultCover,
    avatar: user.avatar,
  })
  // ref the text inputs
  const refNameInput = useRef(null)
  const refIntroInput = useRef(null)

  // handle image changed
  function handleImageChange(action, files) {
    const file = files[0]
    // return if load nothing
    if (!file) return
    // read the file
    readImage(file)
      .then((url) => setInputValues({ ...inputValues, [action]: url }))
      .catch((err) => alert(err))
  }

  // handle discard image
  function handleDiscardCover() {
    setInputValues({ ...inputValues, cover: '' })
  }

  // handle text inputs changed
  function handleInputChange(action, payload) {
    let refElement
    let valid
    switch (action) {
      case 'name':
        refElement = refNameInput.current
        valid = payload?.length <= 50 ? 'false' : 'true'
        break
      case 'intro':
        refElement = refIntroInput.current
        valid = payload?.length <= 160 ? 'false' : 'true'
        break
      default:
        return
    }
    // set data-attribute to show (or hide) the error message
    valid
      ? refElement.setAttribute('data-isvalid', valid)
      : refElement.setAttribute('data-isvalid', valid)
    setInputValues({ ...inputValues, [action]: payload })
  }

  return (
    <>
      <Modal active={showModal} title={'編輯個人資料'} onClose={onClose}>
        <div className={styles.modal__content}>
          <ProfileCoverInput
            src={inputValues.cover}
            onChange={handleImageChange}
            onDiscard={handleDiscardCover}
          />
          <ProfileAvatarInput
            src={inputValues.avatar}
            className={styles.avatar}
            onChange={handleImageChange}
          />
          <NameInput
            value={inputValues.name}
            onChange={handleInputChange}
            ref={refNameInput}
          />
          <IntroInput
            ref={refIntroInput}
            onChange={handleInputChange}
            value={inputValues.intro}
          />
        </div>
        <ClrButton text="儲存" className={styles.saveBtn} onClick={onSave} />
      </Modal>
    </>
  )
}

export default EditProfileModal
