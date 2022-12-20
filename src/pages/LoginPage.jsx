// hooks & context
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import {
  AuthContainer,
  AccountInput,
  PasswordInput,
} from 'components/form/AuthInput'
import { Logo, PageTitle, SmallSpinner } from 'components/share'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'

function LoginPage() {
  const { isAuthenticated, login, role } = useAuth()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showErr, setShowErr] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0 || password.length === 0) return
    setDisabled(true)
    // get data
    const { success, message } = await login({
      role: role.user,
      account,
      password,
    })
    // pop modal
    if (success) {
      Toast('登入成功', 'success').fire()
      navigate('/')
    } else {
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

        <AccountInput
          placeholder="請輸入帳號"
          value={account}
          showErr={showErr}
          onChange={(inputValues) => {
            setShowErr(false)
            setAccount(inputValues)
          }}
          disabled={disabled}
        />

        <PasswordInput
          labelName="密碼"
          inputName="password"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(inputValues) => setPassword(inputValues)}
          disabled={disabled}
        />

        <ClrButton
          text={disabled ? <SmallSpinner /> : '登入'}
          onClick={handleClick}
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
