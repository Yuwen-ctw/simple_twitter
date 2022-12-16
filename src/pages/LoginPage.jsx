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
import { Logo, PageTitle } from 'components/share'
import { BaseLink, ClrButton } from 'components/UI/Buttons'

function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0 || password.length === 0) return
    // get data
    const {
      success,
      token: Authtoken,
      user,
      errorMessage,
    } = await login({
      account,
      password,
    })
    // store token if success, then redirect to '/'
    if (success) {
      localStorage.setItem('authToken', Authtoken)
      navigate('/')
    } else {
      console.log(`登入失敗: ${errorMessage}`)
    }
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
          onChange={(inputValues) => setAccount(inputValues)}
        />

        <PasswordInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(inputValues) => setPassword(inputValues)}
        />

        <ClrButton text="登入" onClick={handleClick} />
        <div>
          <BaseLink text="註冊" to="/register" />·
          <BaseLink text="後台登入" to="/admin" />
        </div>
      </AuthContainer>
    </>
  )
}

export default LoginPage
