import { Logo, PageTitle } from 'components/share'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import { register } from 'api/auth'
import {
  AuthContainer,
  AccountInput,
  NameInput,
  EmailInput,
  PasswordInput 
}from 'components/form/AuthInput'

function RegisterPage() {
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setpasswordCheck] = useState('')
  const navigate = useNavigate()

  // const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (account.length === 0) return
    if (name.length === 0) return
    if (email.length === 0) return
    if (password.length === 0) return
    if (passwordCheck.length === 0) return

    const { success, user, errorMessage } = await register({
      account,
      name,
      email,
      password,
      passwordCheck,
    })
    if (success) {
      navigate('/login')
    } else {
      console.log(`註冊失敗: ${errorMessage}`)
    }

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
      ${errorMessage}`,
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    })
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/todos');
  //   }
  // }, [navigate, isAuthenticated]);

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>建立您的帳號</PageTitle>

        <AccountInput
            placeholder="請輸入帳號"
            value={account}
            onChange={(inputValues)=>setAccount(inputValues)}    
        />

        <NameInput
            placeholder="請輸入名稱"
            value={name}
            onChange={(inputValues)=>setName(inputValues)}  
        />

        <EmailInput
          placeholder="請輸入Email"
          value={email}
          onChange={(inputValues)=>setEmail(inputValues)} 
         /> 

        <PasswordInput
          placeholder="請輸入密碼"
          value={password}
          onChange={(inputValues)=>setPassword(inputValues)}
        /> 

        <PasswordInput
            label="確認密碼"
            placeholder="請再次輸入密碼"
            value={passwordCheck}
            onChange={(value) => setpasswordCheck(value)}
        />

        <ClrButton text="註冊" onClick={handleClick} />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
