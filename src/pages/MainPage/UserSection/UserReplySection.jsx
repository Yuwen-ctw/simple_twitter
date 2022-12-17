// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reply from 'components/Reply'
import db from 'db.json'
import { useOutletContext } from 'react-router-dom'

function UserRepliesSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  // const { userId } = useParams()
  // TODO get Data and likeList...  same as MainSection
  const [data, setData] = useState([])
  useEffect(() => {
    setData(db.replys)
  }, [])

  const dataList = data.map((reply) => <Reply key={reply.id} reply={reply} />)

  return <ul onClick={handleUserOrTweetClick}>{dataList}</ul>
}

export default UserRepliesSection