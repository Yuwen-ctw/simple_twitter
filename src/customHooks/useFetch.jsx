import Toast from 'components/UI/Toast'
import { useEffect, useState } from 'react'

export default function useFetch(axiosPromise, params) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData(axiosPromise, params)
  }, [])

  async function fetchData(axiosPromise, params) {
    setData(null)
    setLoading(true)
    const { success, data, message } = await axiosPromise(params)
    if (success) {
      setData(data)
    } else {
      Toast(message, 'error').fire()
      setError(message)
    }
    setLoading(false)
  }

  const refetch = () => fetchData(axiosPromise, params)

  return { data, loading, error, refetch }
}
