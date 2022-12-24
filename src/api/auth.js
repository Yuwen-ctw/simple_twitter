import { axiosInstance, baseUrl, handleAxiosError } from './axiosInstance'

const basePath = 'users'
const baseAdminPath = 'admin'

export const userLogin = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${basePath}/signin`, {
      account,
      password,
    })
    return { ...data }
  } catch (error) {
    return handleAxiosError(error)
  }
}
export const adminLogin = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(
      `${baseUrl}/${baseAdminPath}/signin`,
      {
        account,
        password,
      }
    )
    return { ...data }
  } catch (error) {
    return handleAxiosError(error)
  }
}

export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axiosInstance.post(`${baseUrl}/${basePath}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
    return data
  } catch (error) {
    return handleAxiosError(error)
  }
}
