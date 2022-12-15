// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainTweet } from 'components/Tweets'
import { getAllTweets } from 'api/tweets'
import { Spinner } from 'components/share'
import { useOutletContext } from 'react-router-dom'

function UserLikesSection() {
  // const { userId } = useParams()
  const { handleUserOrTweetClick } = useOutletContext()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  // get data
  useEffect(() => {
    setLoading(true)
    async function getData() {
      try {
        const tweets = await getAllTweets()
        if (!tweets) return
        setLoading(false)
        setTweets(tweets)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  function handleLikeClick(likeId) {
    setTweets((draft) =>
      draft.map((tweet) => {
        if (tweet.id === likeId) return { ...tweet, isLiked: !tweet.isLiked }
        return tweet
      })
    )
  }

  // map data
  const dataList = tweets.map((tweet) => (
    <MainTweet
      key={tweet.id}
      tweet={tweet}
      onLikeClick={handleLikeClick}
      onReplyClick={() => ''}
    />
  ))
  return (
    <ul onClick={handleUserOrTweetClick}>
      {loading && <Spinner />}
      {dataList}
    </ul>
  )
}

export default UserLikesSection
