import { useEffect, useState } from 'react'

export default function useFetch(axiosPromise) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData(axiosPromise)
  }, [])

  async function fetchData(axiosPromise) {
    console.log('fetch')
    setLoading(true)
    const { success, data, message } = await axiosPromise()
    if (success) {
      setData(data)
    } else {
      setError(message)
    }
    setLoading(false)
  }

  const refetch = () => fetchData(axiosPromise)

  return { data, loading, error, refetch }
}
