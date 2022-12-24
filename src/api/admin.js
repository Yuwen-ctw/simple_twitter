import { axiosInstance, baseUrl, handleAxiosError } from './axiosInstance'

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
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function getAllTweets() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets`)
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function deleteTweet(tweetId) {
  try {
    const { data } = await axiosInstance.delete(
      `${baseUrl}/admin/tweets/${tweetId}`
    )
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}
