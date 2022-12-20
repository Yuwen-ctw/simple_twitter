import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  validateStatus: (status) => status >= 200 && status <= 500,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (err) => console.error(err)
)

export async function getAllUsers() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/admin/users`)
    // if fetch success: [], else {success: false, message: '...'}
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get users failed]: ${err}`,
    }
  }
}

export async function getAllTweets() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets`)
    // if fetch success: [], else {success: false, message: '...'}
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get tweets failed]: ${err}`,
    }
  }
}

export async function deleteTweet(tweetId) {
  try {
    const { data } = await axiosInstance.delete(
      `${baseUrl}/admin/tweets/${tweetId}`
    )
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Detele tweet failed]: ${err}`,
    }
  }
}
