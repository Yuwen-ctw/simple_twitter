import { 
  AuthContainer,
  AccountInput,
  PasswordInput 
} from 'components/form/AuthInput'
import { Logo, PageTitle } from 'components/share'
import { useState,useRef } from 'react'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import { login } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'


function AdminLoginPage() {
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
      navigate('admin/*')
    } else {
      console.log(`登入失敗: ${errorMessage}`)
    }

  }

  return (
     <>
      <AuthContainer>
        <Logo />
        <PageTitle>後台登入</PageTitle>
        
         <AccountInput
            placeholder="請輸入帳號"
            value={account}
             onChange={(inputValues)=>setAccount(inputValues)}    
        />

        <PasswordInput
            label="密碼"
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(inputValues)=>setPassword(inputValues)}
        />

        <ClrButton text="登入" onClick={handleClick} />
        <div>
           <BaseLink text="前台登入" to="/login" />
        </div>
      </AuthContainer>
    </>
  )
}

export default AdminLoginPage
