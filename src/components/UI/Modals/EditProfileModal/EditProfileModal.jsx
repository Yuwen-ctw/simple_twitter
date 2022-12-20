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
  })
  const [imageUri, setImageUri] = useState({
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
    setInputValues({ ...inputValues, [action]: file })
    // read the file
    readImage(file)
      .then((url) =>
        setImageUri({
          ...imageUri,
          [action]: url,
        })
      )
      .catch((err) => alert(err))
  }
  console.log(inputValues)

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
    console.log(inputValues)
    const { success, message } = await EditUser(currentUser.id, inputValues)
    if (success) {
      onSave({
        name: inputValues.name,
        introduction: inputValues.introduction,
        ...imageUri,
      })
    } else {
      console.error(message)
    }
  }

  function handleClose() {
    // back to initial values
    setInputValues({
      name: currentUser?.name || '',
      introduction: currentUser?.introduction || '',
    })
    setImageUri({
      cover: currentUser?.cover,
      avatar: currentUser?.avatar,
    })
    onClose()
  }

  return (
    <>
      <Modal active={showModal} title={'編輯個人資料'} onClose={handleClose}>
        <div className={styles.modal__content}>
          <ProfileCoverInput
            src={imageUri.cover}
            onChange={handleImageChange}
            onDiscard={handleDiscardCover}
          />
          <ProfileAvatarInput
            src={imageUri.avatar}
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
