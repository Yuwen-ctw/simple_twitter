import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import useFetch from 'customHooks/useFetch'
import { getUserInfoData } from 'api/users'
import Reply from 'components/Reply'
import { Spinner } from 'components/share'

function UserRepliesSection() {
  const { userId } = useParams()
  const { handleUserOrTweetClick } = useOutletContext()
  const [replies, setReplies] = useState([])
  const { data, loading } = useFetch(getUserInfoData, {
    fieldName: 'replied_tweets',
    userId,
  })

  useEffect(() => {
    if (!data) return
    setReplies(data)
  }, [loading])

  const dataList = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ))

  return (
    <ul onClick={handleUserOrTweetClick}>
      {loading && <Spinner />}
      {dataList}
    </ul>
  )
}

export default UserRepliesSection
