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
const axiosInstance1 = axios.create({
  baseURL: `${baseUrl}`,
  validateStatus: (status) => status >= 200 && status <= 500,
})
axiosInstance1.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['content-type'] = 'multipart/form-data'
    }
    return config
  },
  (err) => console.error(err)
)

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
    console.log(data)
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

export async function getUserTweets(userId) {
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${userId}/tweets`
    )
    console.log(data)
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      message: `[Unfollow user failed]: ${err}`,
    }
  }
}
