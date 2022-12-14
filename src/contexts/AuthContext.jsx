import { userLogin, adminLogin, register } from 'api/auth'
import { getUser } from 'api/users'
import * as jwt from 'jsonwebtoken'
import { useEffect, useState, createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'

const defaultAuthContext = {
  isAuthenticated: false,
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

  function kickout() {
    setIsAuthenticated(false)
    setPayload(null)
    if (pathname.includes('register')) return
    if (pathname.includes('login')) return
    navigate('login')
  }

  // check authToken when route switched
  useEffect(() => {
    if (pathname.includes('admin')) return

    async function checkPermission() {
      // get token
      const authToken = localStorage.getItem('authToken')
      if (!authToken) return kickout()

      // decode token, and get currentUser data
      const temPayload = jwt.decode(authToken)
      if (!temPayload) return kickout()

      const { success, data, message } = await getUser({
        userId: temPayload.id,
      })
      if (success) {
        setIsAuthenticated(true)
        setPayload(data)
      } else {
        console.error(message)
        kickout()
      }
    }
    checkPermission()
  }, [pathname, navigate])

  function logout() {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setPayload(null)
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
      // store the admin token in session storage
      if (user.role === role.admin) {
        sessionStorage.setItem('authToken', token)
      } else {
        localStorage.setItem('authToken', token)
      }
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
