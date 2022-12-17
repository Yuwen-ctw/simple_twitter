// hooks & context
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { Logo, PageTitle } from 'components/share'
import {
  AuthContainer,
  AccountInput,
  NameInput,
  EmailInput,
  PasswordInput,
} from 'components/form/AuthInput'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Swal from 'sweetalert2'

function RegisterPage() {
  const { isAuthenticated, register } = useAuth()
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setcheckPassword] = useState('')
  const navigate = useNavigate()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0) return
    if (name.length === 0) return
    if (email.length === 0) return
    if (password.length === 0) return
    if (checkPassword.length === 0) return

    const { success, message } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    })

    if (success) {
      navigate('/login')
    } else {
      console.log(`註冊失敗: ${message}`)
    }

    // pop modal
    if (success) {
      Swal.fire({
        position: 'top',
        title: `註冊成功～
        請重新登入！`,
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      })
      return
    }

    Swal.fire({
      position: 'top',
      title: `註冊失敗！
        ${message}`,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    })
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
        <PageTitle>建立您的帳號</PageTitle>

        <AccountInput
          placeholder="請輸入帳號"
          value={account}
          onChange={(inputValues) => setAccount(inputValues)}
        />

        <NameInput
          placeholder="請輸入使用者名稱"
          value={name}
          onChange={(inputValues) => setName(inputValues)}
        />

        <EmailInput
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(inputValues) => setEmail(inputValues)}
        />

        <PasswordInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(inputValues) => setPassword(inputValues)}
        />

        <PasswordInput
          type="password"
          placeholder="請再次輸入密碼"
          value={checkPassword}
          onChange={(inputValue) => setcheckPassword(inputValue)}
        />

        <ClrButton text="註冊" onClick={handleClick} />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
