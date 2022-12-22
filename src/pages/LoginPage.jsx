// hooks & context
import { useState, useEffect, useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { AuthContainer, AuthInput } from 'components/form'
import { Logo, PageTitle, SmallSpinner } from 'components/share'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'

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

function LoginPage() {
  const { isAuthenticated, login, role } = useAuth()
  const [inputPairs, dispatch] = useReducer(inputReducer, initialInput)
  const [disabled, setDisabled] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  function handleInputChange(action) {
    errMsg.length && setErrMsg('')
    dispatch(action)
  }

  async function handleFormSubmit() {
    event.preventDefault()
    if (inputPairs.account.length === 0 || inputPairs.password.length === 0)
      return
    setDisabled(true)
    // get data
    const { success, message } = await login({
      role: role.user,
      account: inputPairs.account,
      password: inputPairs.password,
    })
    // pop modal
    if (success) {
      Toast('登入成功', 'success').fire()
      navigate('/')
    } else {
      setErrMsg(message)
      console.error(message)
      Toast(`登入失敗: ${message}`, 'error').fire()
    }
    setDisabled(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (pathname.includes(process.env.PUBLIC_URL)) navigate(-1)
      else navigate('/')
    }
  }, [navigate, isAuthenticated])

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>登入 Alphitter</PageTitle>

        <AuthInput
          labelName="帳號"
          inputName="account"
          placeholder="請輸入帳號"
          value={inputPairs.account}
          errMsg={errMsg}
          onChange={handleInputChange}
          disabled={disabled}
        />

        <AuthInput
          labelName="密碼"
          inputName="password"
          type="password"
          placeholder="請輸入密碼"
          value={inputPairs.password}
          onChange={handleInputChange}
          disabled={disabled}
        />

        <ClrButton
          text={disabled ? <SmallSpinner /> : '登入'}
          onClick={handleFormSubmit}
        />
        <div>
          <BaseLink text="註冊" to="/register" />·
          <BaseLink text="後台登入" to="/admin" />
        </div>
      </AuthContainer>
    </>
  )
}

export default LoginPage
