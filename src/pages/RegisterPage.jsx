import { AuthContainer, AuthInputContainer } from '../components/form/Auth'
import { Logo, PageTitle } from 'components/share'
import { AuthInput } from 'components/form'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { BaseLink, ClrButton } from 'components/UI/Buttons'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const navigate = useNavigate()

  // const { register, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    const success = await register({
      username,
      nickname,
      email,
      password,
    });
    if (success) {
      localStorage.setItem('authToken', authToken);
      navigate('/login');
    } else{
      console.log(success)
    }


    // if (success) {n
    //   Swal.fire({
    //     position: 'top',
    //     title: '註冊成功！',
    //     timer: 1000,
    //     icon: 'success',
    //     showConfirmButton: false,
    //   });
    //   return;
    // }
    // Swal.fire({
    //   position: 'top',
    //   title: '註冊失敗！',
    //   timer: 1000,
    //   icon: 'error',
    //   showConfirmButton: false,
    // });
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

        <AuthInputContainer>
          <AuthInput
            label="帳號"
            placeholder="請輸入帳號"
            value={username}
            onChange={(nameInputValue) => setUsername(nameInputValue)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            label="名稱"
            placeholder="請輸入使用者名稱"
            value={nickname}
            onChange={(nickInputValue) => setNickname(nickInputValue)}
          />
        </AuthInputContainer>

        <AuthInputContainer>
          <AuthInput
            label="Email"
            placeholder="請輸入 email"
            value={email}
            onChange={(emailInputValue) => setEmail(emailInputValue)}
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

        <AuthInputContainer>
          <AuthInput
            label="確認密碼"
            placeholder="請再次輸入密碼"
            value={checkPassword}
            onChange={(checkInputValue) => setCheckPassword(checkInputValue)}
          />
        </AuthInputContainer>
        <ClrButton text="註冊" onClick={handleClick} />
        <BaseLink text="取消" to="/login" />
      </AuthContainer>
    </>
  )
}

export default RegisterPage
