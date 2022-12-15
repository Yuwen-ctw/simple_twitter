import { login as loginAsync, register } from 'api/auth'
import * as jwt from 'jsonwebtoken'
import { useEffect, useState, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'

const defaultAuthContext = {
  hasAuthToken: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
}
const AuthContext = createContext(defaultAuthContext)
const useAuth = () => useContext(AuthContext)

function AuthContextProvider({ children }) {
  const navigate = useNavigate()
  const [hasAuthToken, setHasAuthToken] = useState(null)
  const [payload, setPayload] = useState(null)
  const { pathname } = useLocation()
  // check authToken when route switched
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      setHasAuthToken(false)
      setPayload(null)
      navigate('/login')
      return
    }
    const temPayload = jwt.decode(authToken)
    console.log(temPayload)
    setHasAuthToken(true)
    setPayload(temPayload)
  }, [pathname])

  function logout() {
    localStorage.removeItem('authToken')
    setHasAuthToken(false)
    setPayload(null)
    navigate('/login')
  }

  async function login(data) {
    const { success, token, errorMessage } = await loginAsync({
      account: data.account,
      password: data.password,
    })
    if (success) {
      const temPayload = jwt.decode(token)
      setHasAuthToken(true)
      setPayload(temPayload)
      localStorage.setItem('authToken', token)
    } else {
      setHasAuthToken(false)
      setPayload(null)
    }
    return { success, errorMessage }
  }
  return (
    <AuthContext.Provider
      value={{
        hasAuthToken,
        currentUser: payload,
        register: register,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthContextProvider }
