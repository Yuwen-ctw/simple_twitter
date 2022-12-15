import axios from 'axios'
const baseUrl = 'http://localhost:3001'
const baseUrl1 = 'https://quiet-mountain-47605.herokuapp.com'

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

export async function getAllTweets() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweets`)
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Get tweets failed]: ${err}`,
    }
  }
}

export async function getTweet(tweetId) {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/tweet${tweetId}`)
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Get tweet failed]: ${err}`,
    }
  }
}
