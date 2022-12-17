import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { getAllReplies } from 'api/tweets'
import Reply from 'components/Reply'

function UserRepliesSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const [replies, setReplies] = useState([])
  const { userId } = useParams()
  // TODO you need change 1924 to userId
  useEffect(() => {
    async function getReplies() {
      const { success, data, message } = await getAllReplies(1924)
      if (success) {
        setReplies(data)
      } else {
        console.error(message)
      }
    }
    getReplies()
  })

  const dataList = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ))

  return <ul onClick={handleUserOrTweetClick}>{dataList}</ul>
}

export default UserRepliesSection
