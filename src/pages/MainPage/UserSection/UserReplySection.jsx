// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Reply from 'components/Reply'
import db from 'db.json'

function UserRepliesSection() {
  // const { userId } = useParams()
  // TODO get Data and likeList...  same as MainSection
  const [data, setData] = useState([])
  useEffect(() => {
    setData(db.replys)
  }, [])

  const dataList = data.map((reply) => <Reply key={reply.id} reply={reply} />)

  return <ul>{dataList}</ul>
}

export default UserRepliesSection
