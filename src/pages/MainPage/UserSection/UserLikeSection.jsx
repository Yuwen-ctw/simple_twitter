// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainTweet } from 'components/Tweets'
import db from 'db.json'

function UserLikesSection() {
  // const { userId } = useParams()
  // TODO get Data and likeList...  same as MainSection
  const [data, setData] = useState([])
  useEffect(() => {
    setData(db.tweets)
  }, [])

  const dataList = data.map((tweet) => (
    <MainTweet key={tweet.id} tweet={tweet} />
  ))
  return <ul>{dataList}</ul>
}

export default UserLikesSection
