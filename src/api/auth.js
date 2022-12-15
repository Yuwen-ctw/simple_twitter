import axios from 'axios'

const authURL = 'https://todo-list.alphacamp.io/api/auth'
const testUrl = 'http://localhost:3001'

export const login = async ({ account, password }) => {
  // TODO 上線後 get 要改 post
  try {
    const { data: resData } = await axios.get(`${testUrl}/login200`, {
      account,
      password,
    })
    // get response data
    const { success, data, message: errorMessage } = resData
    // return data or error message
    if (success) return { success, ...data }
    return { success, errorMessage }
    // handle fetch error
  } catch (error) {
    console.error('[Login Failed]:', error)
  }
}

export const register = async ({
  account,
  name,
  email,
  password,
  passwordCheck,
}) => {
  try {
    // TODO 上線後 get 要改 post
    const { data: resData } = await axios.get(`${testUrl}/register201`, {
      account,
      name,
      email,
      password,
      passwordCheck,
    })
    // get response data
    const { success, user, message: errorMessage } = resData
    // return user or error message
    if (success) return { success, user }
    return { success, errorMessage }
    // handle fetch error
  } catch (error) {
    console.error('[Signup Failed]', error)
  }
}
