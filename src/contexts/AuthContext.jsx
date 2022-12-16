import { login as loginAsync, register } from 'api/auth'
import { getUser } from 'api/users'
import * as jwt from 'jsonwebtoken'
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react'
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
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [payload, setPayload] = useState(null)
  const { pathname } = useLocation()
  // check authToken when route switched
  useEffect(() => {
    async function checkPermission() {
      // get token
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        setIsAuthenticated(false)
        setPayload(null)
        return
      }
      // decode token, and get currentUser data
      const temPayload = jwt.decode(authToken)
      if (!temPayload) return
      const { success, data, message } = await getUser(temPayload.id)
      if (success) {
        setIsAuthenticated(true)
        setPayload(data)
      } else {
        console.error(message)
        setIsAuthenticated(false)
        setPayload(null)
      }
    }
    checkPermission()
  }, [pathname, navigate])

  function logout() {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setPayload(null)
    navigate('/login')
  }

  async function login(data) {
    const { success, token, user, errorMessage } = await loginAsync({
      account: data.account,
      password: data.password,
    })
    if (success) {
      // const temPayload = jwt.decode(token)
      setIsAuthenticated(true)
      setPayload(user)
      localStorage.setItem('authToken', token)
    } else {
      setIsAuthenticated(false)
      setPayload(null)
    }
    return { success, errorMessage }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
