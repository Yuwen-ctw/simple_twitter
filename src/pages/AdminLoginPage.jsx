// hooks & context
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

function AdminLoginPage() {
  const { isAuthenticated, login, role } = useAuth()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showErr, setShowErr] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const handleClick = async () => {
    event.preventDefault()
    if (account.length === 0 || password.length === 0) return
    // get data
    setDisabled(true)
    const { success, message } = await login({
      role: role.admin,
      account,
      password,
    })

    // pop modal
    if (success) {
      Toast('登入成功', 'success').fire()
      navigate('/admin/tweets')
    } else {
      setShowErr(true)
      console.error(message)
      Toast(`登入失敗: ${message}`, 'error').fire()
    }
    setDisabled(false)
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin')
    }
  }, [navigate, isAuthenticated])

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>後台登入</PageTitle>

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
          inputName="password"
          labelName="密碼"
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
          <BaseLink text="前台登入" to="/login" />
        </div>
      </AuthContainer>
    </>
  )
}

export default AdminLoginPage
