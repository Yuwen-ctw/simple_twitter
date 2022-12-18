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
import { useAuth } from 'contexts/AuthContext'
function EditProfileModal({ showModal, onSave, onClose }) {
  const { currentUser } = useAuth()
  // store input values
  const [inputValues, setInputValues] = useState({
    name: currentUser?.name || '',
    introduction: currentUser?.introduction || '',
    cover: currentUser?.cover,
    avatar: currentUser?.avatar,
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
      case 'introduction':
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
    const { success, message } = await EditUser(currentUser.id, inputValues)
    if (success) {
      onSave(inputValues)
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
            value={inputValues.introduction}
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
