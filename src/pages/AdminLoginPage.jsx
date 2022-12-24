// hooks & context
import { useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { AuthContainer, AuthInput } from 'components/form'
import { Logo, PageTitle, SmallSpinner } from 'components/share'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'
import styles from 'assets/styles/pages/loginPage.module.scss'

// reducer setting
const initialInput = {
  account: '',
  password: '',
}

const actions = {
  account: 'account',
  password: 'password',
}

function inputReducer(state, action) {
  switch (action.type) {
    case actions.account:
      return { ...state, account: action.payload }
    case actions.password:
      return { ...state, password: action.payload }
    default:
      return state
  }
}

function AdminLoginPage() {
  const { isAuthenticated, login, role } = useAuth()
  const [inputValues, dispatch] = useReducer(inputReducer, initialInput)
  const [errMsg, setErrMsg] = useState('')
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  function handleInputChange(action) {
    // hide error message
    errMsg.length && setErrMsg('')
    dispatch(action)
  }

  async function handleFormSubmit() {
    event.preventDefault()
    if (inputValues.account.length === 0 || inputValues.password.length === 0)
      return
    // start login process
    setDisabled(true)
    const { success, message } = await login({
      role: role.admin,
      account: inputValues.account,
      password: inputValues.password,
    })

    // pop modal
    if (success) {
      Toast('登入成功', 'success').fire()
      navigate('/admin/tweets')
    } else {
      setErrMsg(message)
      console.error(message)
      Toast(`登入失敗: ${message}`, 'error').fire()
    }
    setDisabled(false)
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [navigate, isAuthenticated])

  return (
    <div className={styles.layout}>
      <Logo />
      <PageTitle>後台登入</PageTitle>
      <form className={styles.form}>
        <AuthInput
          labelName="帳號"
          inputName="account"
          placeholder="請輸入帳號"
          value={inputValues.account}
          errMsg={errMsg}
          onChange={handleInputChange}
          disabled={disabled}
        />

        <AuthInput
          labelName="密碼"
          inputName="password"
          type="password"
          placeholder="請輸入密碼"
          value={inputValues.password}
          onChange={handleInputChange}
          disabled={disabled}
        />

        <ClrButton
          text={disabled ? <SmallSpinner /> : '登入'}
          onClick={handleFormSubmit}
        />
      </form>
      <div className={styles.links}>
        <BaseLink text="前台登入" to="/login" />
      </div>
    </div>
  )
}

export default AdminLoginPage
