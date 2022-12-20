// hooks & context
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { Logo, PageTitle, SmallSpinner } from 'components/share'
import {
  AuthContainer,
  AccountInput,
  NameInput,
  EmailInput,
  PasswordInput,
} from 'components/form/AuthInput'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Toast from 'components/UI/Toast'

function RegisterPage() {
  const { isAuthenticated, register } = useAuth()
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setcheckPassword] = useState('')
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0) return
    if (name.length === 0) return
    if (email.length === 0) return
    if (password.length === 0) return
    if (checkPassword.length === 0) return
    setDisabled(true)
    const { success, message } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    })

    if (success) {
      navigate('/login')
      Toast(
        `註冊成功，
      請重新登入！`,
        'success'
      ).fire()
    } else {
      console.log(`註冊失敗: ${message}`)
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
    }
  }, [navigate, isAuthenticated])

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>建立你的帳號</PageTitle>

        <AccountInput
          placeholder="請輸入帳號"
          value={account}
          onChange={(inputValues) => setAccount(inputValues)}
          disabled={disabled}
        />

        <NameInput
          placeholder="請輸入使用者名稱"
          value={name}
          onChange={(inputValues) => setName(inputValues)}
          disabled={disabled}
        />

        <EmailInput
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(inputValues) => setEmail(inputValues)}
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

        <PasswordInput
          labelName="密碼確認"
          inputName="checkPassword"
          type="password"
          placeholder="請再次輸入密碼"
          value={checkPassword}
          onChange={(inputValue) => setcheckPassword(inputValue)}
          disabled={disabled}
        />

        <ClrButton
          text={disabled ? <SmallSpinner /> : '註冊'}
          onClick={handleClick}
        />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
