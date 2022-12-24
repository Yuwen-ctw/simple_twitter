import { axiosInstance, baseUrl, handleAxiosError } from './axiosInstance'

const basePath = 'users'
const baseFollowPath = 'followships'

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
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function getUser(data) {
  const { userId } = data
  try {
    const { data } = await axiosInstance.get(`${baseUrl}/${basePath}/${userId}`)
    if (data.success === false) return { ...data }
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
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
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function followUser(userId) {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${baseFollowPath}`, {
      id: userId,
    })
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}

export async function unfollowUser(userId) {
  try {
    const { data } = await axiosInstance.delete(
      `${baseUrl}/${baseFollowPath}/${userId}`
    )
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}
// dataName: tweets, replied_tweets, likes, followings, followers
export async function getUserInfoData(data) {
  const { fieldName, userId } = data
  try {
    const { data } = await axiosInstance.get(
      `${baseUrl}/${basePath}/${userId}/${fieldName}`
    )
    return { success: true, data }
  } catch (error) {
    return handleAxiosError(error)
  }
}
