import { userLogin, adminLogin, register } from 'api/auth'
import { getUser } from 'api/users'
import * as jwt from 'jsonwebtoken'
import { useEffect, useState, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'

const defaultAuthContext = {
  hasAuthToken: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
  role: null,
}
const AuthContext = createContext(defaultAuthContext)
const useAuth = () => useContext(AuthContext)

function AuthContextProvider({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [payload, setPayload] = useState(null)
  const { pathname } = useLocation()
  const role = {
    user: 'user',
    admin: 'admin',
  }
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
    const loginFunc = data.role === role.admin ? adminLogin : userLogin
    const { success, token, user, message } = await loginFunc({
      account: data.account,
      password: data.password,
    })
    if (success) {
      setIsAuthenticated(true)
      setPayload(user)
      localStorage.setItem('authToken', token)
    } else {
      setIsAuthenticated(false)
      setPayload(null)
    }
    return { success, message }
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser: payload,
        register,
        login,
        logout,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth, AuthContextProvider }
