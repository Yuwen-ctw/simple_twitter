import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { getUserInfoData } from 'api/users'
import Reply from 'components/Reply'
import { Spinner } from 'components/share'

function UserRepliesSection() {
  const { userId } = useParams()
  const { handleUserOrTweetClick } = useOutletContext()
  const [replies, setReplies] = useState([])
  const [loading, setLoading] = useState(false)

  // get data
  useEffect(() => {
    setLoading(true)
    async function getReplies() {
      const { success, data, message } = await getUserInfoData(
        'replied_tweets',
        userId
      )
      if (success) {
        setLoading(false)
        setReplies(data)
      } else {
        console.error(message)
      }
    }
    getReplies()
  }, [])

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
