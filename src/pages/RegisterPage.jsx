// hooks & context
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
// components
import { Logo, PageTitle } from 'components/share'
import { AuthContainer, AuthInput } from 'components/form/AuthInput'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import Swal from 'sweetalert2'

function RegisterPage({ user }) {
  const { isAuthenticated, register } = useAuth()

  const [inputValues, setInputValues] = useState({
    name: user.name,
  })

  const [account, setAccount] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setcheckPassword] = useState('')
  const [state, setState] = useState(true)
  const navigate = useNavigate()

  const refNameInput = useRef(null)

  function handleInputChange() {
    let refElement = refNameInput.current
    if (refElement.length >= 50) {
      setState(true)
    } else {
      setInputValues(...inputValues)
    }
    // ...建立新物件
  }

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

        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={account}
          onChange={(accountInputValues) => setAccount(accountInputValues)}
        />

        <AuthInput
          label="名稱"
          placeholder="請輸入使用者名稱"
          value={inputValues.name}
          onChange={handleInputChange}
          state={state}
        />

        <AuthInput
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailInputValues) => setEmail(emailInputValues)}
        />

        <AuthInput
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(passwordInputValues) => setPassword(passwordInputValues)}
        />

        <AuthInput
          label="密碼確認"
          type="password"
          placeholder="請再次輸入密碼"
          value={checkPassword}
          onChange={(checkPassswordInputValue) =>
            setcheckPassword(checkPassswordInputValue)
          }
        />

        <ClrButton text="註冊" onClick={handleClick} />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
