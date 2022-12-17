import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'
const basePath = 'users'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  validateStatus: (status) => status >= 200 && status <= 500,
})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (err) => console.error(err)
)

export async function getUser(userId) {
  try {
    const { data: resData } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${userId}`
    )

    const { success, data, message } = resData
    if (success === true || success === 'true') {
      return { success, data }
    }
    return { success: false, message }
  } catch (err) {
    return {
      success: false,
      message: `[Get tweets failed]: ${err}`,
    }
  }
}

export async function EditUser(userData) {
  try {
    const { data: resData } = await axiosInstance.put(
      `${baseUrl}/${basePath}/${userData.id}`
    )
    const { success, data, message } = resData
    if (success === true || success === 'true') {
      return { success, data }
    }
    return { success: false, message }
  } catch (err) {
    return {
      success: false,
      message: `[Get tweets failed]: ${err}`,
    }
  }
}
