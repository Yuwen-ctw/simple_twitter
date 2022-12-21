import axios from 'axios'

const baseUrl = 'https://quiet-mountain-47605.herokuapp.com/api'
const basePath = 'users'
const baseFollowPath = 'followships'

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

export async function getTop10Users() {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/${basePath}/top`)
    // if fetch success: [], else {success: false, message: '...'}
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get top10 users failed]: ${err}`,
    }
  }
}

export async function getUser(userId) {
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/${basePath}/${userId}`)
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get User failed]: ${err}`,
    }
  }
}

export async function EditUser(userId, userData) {
  try {
    const { data } = await axiosInstance.put(
      `${baseUrl}/${basePath}/${userId}`,
      userData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Edit User failed]: ${err}`,
    }
  }
}

export async function followUser(userId) {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${baseFollowPath}`, {
      id: userId,
    })
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Follow user failed]: ${err}`,
    }
  }
}

export async function unfollowUser(userId) {
  try {
    const { data } = await axiosInstance.delete(
      `${baseUrl}/${baseFollowPath}/${userId}`
    )
    return data
  } catch (err) {
    return {
      success: false,
      message: `[Unfollow user failed]: ${err}`,
    }
  }
}
// dataName: tweets, replied_tweets, likes, followings, followers
export async function getUserInfoData(dataName, userId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${userId}/${dataName}`
    )
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Get user's ${dataName} failed]: ${err}`,
    }
  }
}
