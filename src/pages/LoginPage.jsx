import { AuthContainer, AuthInputContainer } from '../components/form/Auth'
import { Logo, PageTitle } from 'components/share'
import { AuthInput } from 'components/form'
import { useState, useEffect } from 'react'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import { login } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // // const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
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

  // useEffect(() => {
  // if (isAuthenticated) {
  //   navigate('/MainRoutes');
  // }
  // }, [navigate, isAuthenticated]);

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>登入 Alphitter</PageTitle>

        <AuthInputContainer>
          <AuthInput
            label="帳號"
            placeholder="請輸入帳號"
            value={account}
            onChange={(nameInputValue) => setAccount(nameInputValue)}
          />
          {/* console.log(AuthInput) */}
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            type="password"
            label="密碼"
            placeholder="請輸入密碼"
            value={password}
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />
        </AuthInputContainer>
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
