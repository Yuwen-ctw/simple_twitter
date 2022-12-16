import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'
const basePath = 'users'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
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
    const { data } = await axiosInstance.get(`${baseUrl}/${basePath}/${userId}`)
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Get tweets failed]: ${err}`,
    }
  }
}
