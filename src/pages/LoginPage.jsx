// hooks & context
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import {
  AuthContainer,
  AuthInput,
} from 'components/form/AuthInput'
import { Logo, PageTitle } from 'components/share'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Swal from 'sweetalert2'

function LoginPage() {
  const { isAuthenticated, login, role } = useAuth()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showErr, setShowErr] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0 || password.length === 0) return
    // get data
    const { success, message } = await login({
      role: role.user,
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
      console.error(message)
      setShowErr(true)
      Swal.fire({
        position: 'top',
        title: `登入失敗！
        ${message}`,
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      })
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

        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          showErr={showErr}
          onChange={(inputValues) => {
            setShowErr(false)
            setAccount(inputValues)
          }}
        />

        <AuthInput
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
