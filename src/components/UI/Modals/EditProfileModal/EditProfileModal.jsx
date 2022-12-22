// hooks, api, utility
import { useRef, useState } from 'react'
import { EditUser } from 'api/users'
import readImage from 'uitlities/readImage'
// components
import { ClrButton } from 'components/UI/Buttons'
import { SmallSpinner } from 'components/share'
import Toast from 'components/UI/Toast'
import Modal from '../share/Modal'
import {
  IntroInput,
  NameInput,
  ProfileCoverInput,
  ProfileAvatarInput,
} from './base'
import styles from 'assets/styles/components/modals/editProfileModal.module.scss'

function EditProfileModal({ user, onSave, onClose }) {
  const [disabled, setDisabled] = useState(false)
  // ref the text inputs
  const refNameInput = useRef(null)
  const refIntroInput = useRef(null)
  // store input values
  const [inputValues, setInputValues] = useState({
    name: user?.name || '',
    introduction: user?.introduction || '',
    cover: user?.cover,
    avatar: user?.avatar,
  })
  // store img uri to render preview photo
  const [imageUri, setImageUri] = useState({
    cover: user?.cover,
    avatar: user?.avatar,
  })

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

  // handle discard image
  function handleDiscardCover() {
    if (disabled) return
    setInputValues({ ...inputValues, cover: 'deleteCover' })
    setImageUri({ ...imageUri, cover: null })
  }

  // handle text inputs changed
  function handleInputChange(action, payload) {
    let refElement
    let valid
    switch (action) {
      case 'name':
        refElement = refNameInput.current
        valid = payload?.length > 50 && payload?.length < 1 ? 'true' : 'false'
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
      ? refElement.setAttribute('data-invalid', valid)
      : refElement.setAttribute('data-invalid', valid)
    setInputValues({ ...inputValues, [action]: payload })
  }

  async function handleSave() {
    // check valid
    if (inputValues.name.length === 0)
      return Toast('請輸入名稱！', 'error').fire()
    if (inputValues.name.length > 50 || inputValues.introduction.length > 160) {
      Toast('字數超出上限！', 'error').fire()
      return
    }
    // save start
    setDisabled(true)
    const { success, data, message } = await EditUser(user.id, inputValues)
    if (success) {
      Toast('設定成功', 'success').fire()
      onSave({
        name: data.name,
        introduction: data.introduction,
        avatar: data.avatar,
        cover: data.cover,
      })
    } else {
      Toast(message, 'error').fire()
      console.error(message)
    }
    setDisabled(false)
  }

  function handleClose() {
    // back to initial values
    setInputValues({
      name: user?.name || '',
      introduction: user?.introduction || '',
    })
    setImageUri({
      cover: user?.cover,
      avatar: user?.avatar,
    })
    onClose()
  }

  return (
    <>
      <Modal active title={'編輯個人資料'} onClose={handleClose}>
        <div className={styles.modal__content}>
          <ProfileCoverInput
            src={imageUri.cover}
            onChange={handleImageChange}
            onDiscard={handleDiscardCover}
            disabled={disabled}
          />
          <ProfileAvatarInput
            src={imageUri.avatar}
            className={styles.avatar}
            onChange={handleImageChange}
            disabled={disabled}
          />
          <NameInput
            value={inputValues.name}
            onChange={handleInputChange}
            ref={refNameInput}
            disabled={disabled}
          />
          <IntroInput
            ref={refIntroInput}
            onChange={handleInputChange}
            value={inputValues.introduction}
            disabled={disabled}
          />
        </div>
        <ClrButton
          text={
            disabled ? <SmallSpinner classname={styles.smSpinner} /> : '儲存'
          }
          className={styles.saveBtn}
          onClick={handleSave}
        />
      </Modal>
    </>
  )
}

export default EditProfileModal
