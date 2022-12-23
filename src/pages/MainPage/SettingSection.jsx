// hooks, api
import { useEffect, useReducer, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { EditUser } from 'api/users'
// components
import { SectionTitle, SmallSpinner } from 'components/share'
import { AuthInput } from 'components/form'
import { ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'
import styles from 'assets/styles/pages/settingSection.module.scss'

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
  const { currentUser, isAuthenticated } = useAuth()
  const [inputValues, dispatch] = useReducer(inputReducer, initialInput)
  const inputNames = Object.keys(inputValues)
  const [disabled, setDisabled] = useState(false)
  const [errMsg, setErrMsg] = useState({})

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
  }, [isAuthenticated])

  function handleInputChange(action) {
    const { type, payload } = action
    dispatch(action)

    // clean error message if length > 0
    if (payload.length >= 0) setErrMsg({ ...errMsg, [type]: '' })
    // check name length
    if (type === actions.name && payload.length > 50) {
      setErrMsg({ ...errMsg, name: '字數超出上限' })
    }
  }

  async function handleFormSubmit() {
    event.preventDefault()
    // 檢查空白
    const emptyInputName = inputNames.find(
      (name) => inputValues[name].length === 0
    )
    if (emptyInputName) {
      setErrMsg({ ...errMsg, [emptyInputName]: '內容不可空白' })
      return
    }
    // 檢查錯誤訊息
    const errMsgNames = Object.keys(errMsg)
    const anyInvalid = errMsgNames.some((key) => errMsg[key] !== '')
    if (anyInvalid) return

    // 檢查email格式
    const emailRegExp = new RegExp(/^([\w\-.])+@([\w\-.])+\.[A-Za-z]+$/)
    const validEmailFormat = emailRegExp.test(inputValues.email)
    if (!validEmailFormat) {
      setErrMsg({ ...errMsg, email: 'Email 格式錯誤' })
      return
    }

    // Edit user process
    setDisabled(true)
    const { success, message } = await EditUser(currentUser.id, inputValues)
    if (success) {
      Toast('設定成功', 'success').fire()
    } else {
      const accountMsg = message.match(/account.*/i)
      const emailMsg = message.match(/email.*/i)
      const pwMsg = message.match(/密碼.*/i)
      try {
        // 取出錯誤訊息
        accountMsg && setErrMsg({ ...errMsg, account: accountMsg[0] })
        emailMsg && setErrMsg({ ...errMsg, email: emailMsg[0] })
        pwMsg &&
          setErrMsg({ ...errMsg, password: pwMsg[0], checkPassword: pwMsg[0] })
      } catch (err) {
        console.error(err)
      }
      dispatch({ type: actions.password, payload: '' })
      dispatch({ type: actions.checkPassword, payload: '' })
    }
    setDisabled(false)
  }

  return (
    <section className={styles.layout}>
      <SectionTitle text="帳戶設定" />
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <AuthInput
          placeholder="請輸入帳號"
          labelName="帳號"
          inputName="account"
          value={inputValues.account}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.account}
        />
        <AuthInput
          placeholder="請輸入使用者名稱"
          labelName="名稱"
          inputName="name"
          value={inputValues.name}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.name}
        />
        <AuthInput
          placeholder="請輸入 email"
          labelName="Email"
          inputName="email"
          value={inputValues.email}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.email}
        />
        <AuthInput
          placeholder="請輸入密碼"
          labelName="密碼"
          inputName="password"
          type="password"
          value={inputValues.password}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.password}
        />
        <AuthInput
          placeholder="請再次輸入密碼"
          inputName="checkPassword"
          type="password"
          value={inputValues.checkPassword}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.checkPassword}
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
