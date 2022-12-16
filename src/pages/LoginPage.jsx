import { Logo, PageTitle } from 'components/share'
import { 
  AuthContainer,
  AccountInput,
  PasswordInput 
} from 'components/form/AuthInput'
import { useState,useRef } from 'react'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import { login } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'
import styles from 'assets/styles/components/form/authInput.module.scss'

function LoginPage() {

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


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

  

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>登入 Alphitter</PageTitle>

        <AccountInput
            placeholder="請輸入帳號"
            value={account}
            // value={inputValues.account}
            // onChange={handleInputChange}
            onChange={(inputValues)=>setAccount(inputValues)}    
        />

        <PasswordInput
            label="密碼"
            type="password"
            placeholder="請輸入密碼"
            value={password}
            // value={inputValues.password}
            // onChange={handleInputChange}
            onChange={(inputValues)=>setPassword(inputValues)}
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


 