import axios from 'axios'

// const baseUrl = 'http://localhost:3001/api'
const baseUrl = 'https://43krkt.deta.dev/api'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
})

const handleAxiosError = (error) => {
  if (error.response) {
    const response = error.response
    if (response.data?.success !== undefined) {
      const { success, message } = response.data
      return { success, message }
    } else {
      console.log('Error response: ')
      console.error(response)
      return {
        success: false,
        message: `Status: ${response.status}  ${response.statusText}`,
      }
    }
  }

  if (error.request) {
    console.error(`No response received. Error request: ${error.request}`)
    return
  }

  console.error(`Error config: ${error.config}`)
}

export { axiosInstance, baseUrl, handleAxiosError }
