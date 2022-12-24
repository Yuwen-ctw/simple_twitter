import { useEffect, useState } from 'react'

export default function useFetch(axiosPromise) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { success, data, message } = await axiosPromise()
      if (success) {
        setData(data)
      } else {
        setError(message)
      }
      setLoading(false)
    }
    fetchData()
  }, [])
  return { data, loading, error }
}
