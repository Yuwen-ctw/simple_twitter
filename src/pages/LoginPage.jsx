// hooks & context
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { AuthContainer, AuthInputContainer } from '../components/form/Auth'
import { Logo, PageTitle } from 'components/share'
import { AuthInput } from 'components/form'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Swal from 'sweetalert2'

function LoginPage() {
  const { hasAuthToken, login } = useAuth()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0 || password.length === 0) return
    const { success, errorMessage } = await login({
      account,
      password,
    })
    // pop modal
    if (success) {
      Swal.fire({
        position: 'top',
        title: `登入成功！`,
        timer: 800,
        icon: 'success',
        showConfirmButton: false,
      })
      navigate('/')
    } else {
      console.error(errorMessage)
      Swal.fire({
        position: 'top',
        title: `登入失敗！
        ${errorMessage}`,
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }

  useEffect(() => {
    if (hasAuthToken) {
      navigate('/')
    }
  }, [navigate, hasAuthToken])

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
