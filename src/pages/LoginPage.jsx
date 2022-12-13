import { AuthContainer, AuthInputContainer } from '../components/form/Auth'
import { Logo, PageTitle } from 'components/share'
import { AuthInput } from 'components/form'
import { useState, useEffect } from 'react'
import { BaseLink, ClrButton } from 'components/UI/Buttons'
import { login } from '../api/auth';

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigate()

  // // const { login, isAuthenticated } = useAuth();

  const handleClick = async () => {
    if (username.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { success, authToken } = await login({
      username,
      password,
    });
    if (success) {
      localStorage.setItem('authToken', authToken);
    }
  };

  // useEffect(() => {
  // if (isAuthenticated) {
  //   navigate('/MainRoutes');
  // }
  // }, [navigate, isAuthenticated]);

  return (
    <>
      <AuthContainer>
        <Logo />
        <PageTitle>登入 Alphitter</PageTitle>

        <AuthInputContainer>
          <AuthInput
            label="帳號"
            placeholder="請輸入帳號"
            value={username}
            onChange={(nameInputValue) => setUsername(nameInputValue)}
          />
          {/* console.log(AuthInput) */}
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
