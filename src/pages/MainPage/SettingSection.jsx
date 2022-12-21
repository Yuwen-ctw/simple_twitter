import { useEffect, useReducer, useRef, useState } from 'react'
import { SectionTitle, SmallSpinner } from 'components/share'
import { SettingInput } from 'components/form'
import { ClrButton } from 'components/UI/Buttons'
import styles from 'assets/styles/pages/settingSection.module.scss'
import { useAuth } from 'contexts/AuthContext'
import { EditUser } from 'api/users'
import Toast from 'components/UI/Toast'

const initialInput = {
  account: '',
  name: '',
  email: '',
  password: '',
  checkPassword: '',
}

const actions = {
  account: 'account',
  name: 'name',
  email: 'email',
  password: 'password',
  checkPassword: 'checkPassword',
  all: 'all',
}

function inputReducer(state, action) {
  switch (action.type) {
    case actions.account:
      return { ...state, account: action.payload }
    case actions.name:
      return { ...state, name: action.payload }
    case actions.email:
      return { ...state, email: action.payload }
    case actions.password:
      return { ...state, password: action.payload }
    case actions.checkPassword:
      return { ...state, checkPassword: action.payload }
    case actions.all:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

function SettingSection() {
  const { currentUser } = useAuth()
  const [inputValues, dispatch] = useReducer(inputReducer, initialInput)
  const [errMessage, setErrMessage] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const inputContainersRef = useRef({})
  const inputRefs = inputContainersRef.current
  const inputNames = Object.keys(inputValues)
  // get initial values
  useEffect(() => {
    dispatch({
      type: actions.all,
      payload: {
        account: currentUser?.account,
        name: currentUser?.name,
        email: currentUser?.email,
      },
    })
  }, [])

  function handleInputChange(action) {
    dispatch(action)
    // hide error message if value changed
    if (action.payload.length > 0) {
      inputRefs[action.type].setAttribute('data-invalid', 'false')
    }
    // check name length
    if (action.type === actions.name && action.payload.length > 50) {
      inputRefs[action.type].setAttribute('data-invalid', 'true')
      setErrMessage('字數超出上限')
    } else {
      inputRefs[action.type].setAttribute('data-invalid', 'false')
    }
  }

  async function handleFormSubmit() {
    event.preventDefault()
    const anyInvalid = inputNames.some(
      (key) => inputRefs[key].getAttribute('data-invalid') === 'true'
    )
    if (anyInvalid) return
    const emptyInput = inputNames.find((key) => inputValues[key].length === 0)
    // check empty value
    if (emptyInput) {
      inputRefs[emptyInput].setAttribute('data-invalid', 'true')
      setErrMessage('內容不可空白')
      return
    }
    // send Edit api
    setDisabled(true)
    const { success, message } = await EditUser(currentUser.id, inputValues)
    if (success) {
      Toast('設定成功', 'success').fire()
    } else {
      Toast(message, 'error').fire()
      console.error(message)
    }
    setDisabled(false)
  }

  return (
    <section className={styles.layout}>
      <SectionTitle text="帳戶設定" />
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <SettingInput
          labelName="帳號"
          inputName="account"
          value={inputValues.account}
          onChange={handleInputChange}
          ref={(ref) => (inputContainersRef.current['account'] = ref)}
          disabled={disabled}
        />
        <SettingInput
          labelName="名稱"
          inputName="name"
          value={inputValues.name}
          onChange={handleInputChange}
          errMessage={errMessage}
          ref={(ref) => (inputContainersRef.current['name'] = ref)}
          disabled={disabled}
        />
        <SettingInput
          labelName="Email"
          inputName="email"
          value={inputValues.email}
          onChange={handleInputChange}
          ref={(ref) => (inputContainersRef.current['email'] = ref)}
          disabled={disabled}
        />
        <SettingInput
          labelName="密碼"
          inputName="password"
          type="password"
          value={inputValues.password}
          onChange={handleInputChange}
          ref={(ref) => (inputContainersRef.current['password'] = ref)}
          disabled={disabled}
        />
        <SettingInput
          labelName="密碼再確認"
          inputName="checkPassword"
          type="password"
          value={inputValues.checkPassword}
          onChange={handleInputChange}
          ref={(ref) => (inputContainersRef.current['checkPassword'] = ref)}
          disabled={disabled}
        />
        <ClrButton
          text={disabled ? <SmallSpinner /> : '確認'}
          className={styles.saveBtn}
        />
      </form>
    </section>
  )
}

export default SettingSection
