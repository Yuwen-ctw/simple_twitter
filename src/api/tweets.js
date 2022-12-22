import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'
const basePath = 'tweets'

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

export async function getAllTweets() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/${basePath}`)
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

export async function getTweet(tweetId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${tweetId}`
    )
    // if fetch success: [], else {success: false, message: '...'}
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get tweet failed]: ${err}`,
    }
  }
}

export async function addTweet(description) {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${basePath}`, {
      description,
    })
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Get tweet failed]: ${err}`,
    }
  }
}

export async function likeTweet(tweetId) {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/like`
    )
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Like tweet failed]: ${err}`,
    }
  }
}

export async function dislikeTweet(tweetId) {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/unlike`
    )
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Dislike tweet failed]: ${err}`,
    }
  }
}

export async function getAllReplies(tweetId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${tweetId}/replies`
    )
    // if fetch success: [], else {success: false, message: '...'}
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get Replies failed]: ${err}`,
    }
  }
}

export async function addReply(data) {
  const { tweetId, comment } = data
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/replies`,
      { comment }
    )
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Add Reply failed]: ${err}`,
    }
  }
}
