import { axiosInstance, baseUrl, handleAxiosError } from './axiosInstance'

const basePath = 'tweets'

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
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function getTweet(tweetId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${tweetId}`
    )
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function addTweet(description) {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${basePath}`, {
      description,
    })
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function likeTweet(tweetId) {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/like`
    )
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function dislikeTweet(tweetId) {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/unlike`
    )
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function getAllReplies(tweetId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${tweetId}/replies`
    )
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function addReply(data) {
  const { tweetId, comment } = data
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${basePath}/${tweetId}/replies`,
      { comment }
    )
    return { ...data }
  } catch (error) {
    return handleAxiosError(error)
  }
}
