// hooks, api, utility
import { useRef, useState } from 'react'
import { EditUser } from 'api/users'
import readImage from 'uitlities/readImage'
// components
import { ClrButton } from 'components/UI/Buttons'
import Modal from '../share/Modal'
import {
  IntroInput,
  NameInput,
  ProfileCoverInput,
  ProfileAvatarInput,
} from './base'
import styles from 'assets/styles/components/modals/editProfileModal.module.scss'

function EditProfileModal({ user, showModal, onClose }) {
  // store input values
  const [inputValues, setInputValues] = useState({
    name: user?.name || '',
    intro: user?.introduction || '',
    cover: user?.cover,
    avatar: user?.avatar,
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
    setInputValues({ ...inputValues, cover: null })
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

  async function handleSave() {
    // TODO call api here
    const abc = { success: true, data: '' }
    // const { success, data, message } = EditUser(inputValues)
    const { success, data, message } = abc
    if (success) {
      console.log(inputValues)
      onClose()
    } else {
      console.error(message)
    }
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
        <ClrButton
          text="儲存"
          className={styles.saveBtn}
          onClick={handleSave}
        />
      </Modal>
    </>
  )
}

export default EditProfileModal
