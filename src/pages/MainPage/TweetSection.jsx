import { useParams } from 'react-router-dom'

function TweetSection() {
  const { tweetId } = useParams()
  return (
    <>
      <h1>This is TweetSection on /main/tweet/{tweetId}</h1>
    </>
  )
}

export default TweetSection
