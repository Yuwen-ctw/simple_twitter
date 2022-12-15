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

function RegisterPage() {
  const { hasAuthToken, register } = useAuth()
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

    const { success, errorMessage } = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    })
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
      navigate('/login')
    } else {
      console.log(`註冊失敗: ${errorMessage}`)
      Swal.fire({
        position: 'top',
        title: `註冊失敗！
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
        <PageTitle>建立您的帳號</PageTitle>

        <AuthInputContainer>
          <AuthInput
            label="帳號"
            placeholder="請輸入帳號"
            value={account}
            onChange={(value) => setAccount(value)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            label="名稱"
            placeholder="請輸入使用者名稱"
            value={name}
            onChange={(value) => setName(value)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            label="Email"
            placeholder="請輸入 email"
            value={email}
            onChange={(value) => setEmail(value)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            type="password"
            label="密碼"
            placeholder="請輸入密碼"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            label="確認密碼"
            placeholder="請再次輸入密碼"
            value={checkPassword}
            onChange={(value) => setcheckPassword(value)}
          />
        </AuthInputContainer>
        <ClrButton text="註冊" onClick={handleClick} />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
