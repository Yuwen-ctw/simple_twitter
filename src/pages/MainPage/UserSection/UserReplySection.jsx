import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useEdit } from 'contexts/EditContext'
import useFetch from 'customHooks/useFetch'
import { getUserInfoData } from 'api/users'
import Reply from 'components/Reply'
import { Spinner } from 'components/share'

function UserRepliesSection() {
  const { userId } = useParams()
  const { handleUserOrTweetClick } = useOutletContext()
  const { isEdited } = useEdit()
  const [replies, setReplies] = useState([])
  const { data, loading, refetch } = useFetch(getUserInfoData, {
    fieldName: 'replied_tweets',
    userId,
  })

  useEffect(() => {
    if (!data) return
    setReplies(data)
  }, [loading])

  // refetch user edited profile
  useEffect(() => {
    if (!isEdited) return
    refetch(getUserInfoData, {
      fieldName: 'replied_tweets',
      userId,
    })
  }, [isEdited])

  const dataList = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ))

  return (
    <ul onClick={handleUserOrTweetClick} className="scrollbar">
      {loading && <Spinner />}
      {dataList}
    </ul>
  )
}

export default UserRepliesSection
