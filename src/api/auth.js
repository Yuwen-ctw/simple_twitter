import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'
const basePath = 'users'
const baseAdminPath = 'admin'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  validateStatus: (status) => status >= 200 && status <= 500,
})

export const userLogin = async ({ account, password }) => {
  try {
    const { data: resData } = await axiosInstance.post(
      `${baseUrl}/${basePath}/signin`,
      {
        account,
        password,
      }
    )
    // get response data
    const { success, token, user, message } = resData
    // return data or error message
    if (success === true || success === 'true') {
      return { success, token, user }
    }
    return { success: false, message }
    // handle error
  } catch (error) {
    return { success: false, message: `伺服器無回應` }
  }
}

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data: resData } = await axiosInstance.post(
      `${baseUrl}/${basePath}`,
      {
        account,
        name,
        email,
        password,
        checkPassword,
      }
    )

    // get response data
    const { success, user, message } = resData
    // return user or error message
    if (success === true || success === 'true') return { success, user }
    return { success: false, message }
    // handle fetch error
  } catch (error) {
    console.error(error)
    return { success: false, message: `伺服器無回應` }
  }
}

export const adminLogin = async ({ account, password }) => {
  try {
    const { data: resData } = await axiosInstance.post(
      `${baseUrl}/${baseAdminPath}/signin`,
      {
        account,
        password,
      }
    )
    // get response data
    const { success, token, user, message } = resData
    // return data or error message
    if (success === true || success === 'true') {
      return { success, token, user }
    }
    return { success: false, message }
    // handle error
  } catch (error) {
    return { success: false, message: `伺服器無回應` }
  }
}
