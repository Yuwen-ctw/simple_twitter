// hooks & context
import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { Logo, PageTitle, SmallSpinner } from 'components/share'
import { AuthInput } from 'components/form'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'
import styles from 'assets/styles/pages/loginPage.module.scss'

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

function RegisterPage() {
  const { isAuthenticated, register } = useAuth()
  const [inputValues, dispatch] = useReducer(inputReducer, initialInput)
  const [disabled, setDisabled] = useState(false)
  const [errMsg, setErrMsg] = useState({})
  const navigate = useNavigate()
  const inputNames = Object.keys(inputValues)

  function handleInputChange(action) {
    const { type, payload } = action
    dispatch(action)
    // clean error message if length > 0
    if (payload.length >= 0) setErrMsg({ ...errMsg, [type]: '' })

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
    const anyInvalid = inputNames.some((key) => errMsg[key] !== '')
    if (anyInvalid) return

    // 檢查email格式
    const emailRegExp = new RegExp(/^([\w\-.])+@([\w\-.])+\.[A-Za-z]+$/)
    const validEmailFormat = emailRegExp.test(inputValues.email)
    if (!validEmailFormat) {
      setErrMsg({ ...errMsg, email: 'Email 格式錯誤' })
      return
    }

    // register process
    setDisabled(true)
    const { success, message } = await register(inputValues)

    if (success) {
      navigate('/login')
      Toast(
        `註冊成功，
      請重新登入！`,
        'success'
      ).fire()
    } else {
      const accountMsg = message.match(/account.*/i)
      const emailMsg = message.match(/email.*/i)
      const pwMsg = message.match(/密碼.*/i)
      try {
        accountMsg && setErrMsg({ ...errMsg, account: accountMsg[0] })
        emailMsg && setErrMsg({ ...errMsg, email: emailMsg[0] })
        pwMsg &&
          setErrMsg({ ...errMsg, password: pwMsg[0], checkPassword: pwMsg[0] })
      } catch (err) {
        console.error(err)
      }
      // clean the password input
      dispatch({ type: actions.password, payload: '' })
      dispatch({ type: actions.checkPassword, payload: '' })

      Toast(
        `註冊失敗：
        ${message}`,
        'error'
      ).fire()
    }
    setDisabled(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
      Toast('登入成功', 'success').fire()
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={styles.layout}>
      <Logo />
      <PageTitle>建立你的帳號</PageTitle>
      <form className={styles.form}>
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
          type="email"
          value={inputValues.email}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.email}
        />
        <AuthInput
          type="password"
          placeholder="請輸入密碼"
          labelName="密碼"
          inputName="password"
          value={inputValues.password}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.password}
        />
        <AuthInput
          type="password"
          placeholder="請再次輸入密碼"
          labelName="密碼確認"
          inputName="checkPassword"
          value={inputValues.checkPassword}
          onChange={handleInputChange}
          disabled={disabled}
          errMsg={errMsg.checkPassword}
        />

        <ClrButton
          text={disabled ? <SmallSpinner /> : '註冊'}
          onClick={handleFormSubmit}
        />
      </form>
      <div className={[styles.links, styles.center].join(' ')}>
        <BaseLink text="取消" to="/login" />
      </div>
    </div>
  )
}

export default RegisterPage
