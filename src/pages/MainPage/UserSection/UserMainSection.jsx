// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainTweet } from 'components/Tweets'
import { Spinner } from 'components/share'
import { getAllTweets } from 'api/tweets'
import { useOutletContext } from 'react-router-dom'

function UserMainSection() {
  // const { userId } = useParams()
  const { handleUserOrTweetClick } = useOutletContext()
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  // get data
  useEffect(() => {
    setLoading(true)
    async function getData() {
      const { success, data, message } = await getAllTweets()
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweets(data?.tweets || [])
      } else {
        // handle error
        console.error(message)
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
  const tweetList = tweets.map((tweet) => (
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
      {tweetList}
    </ul>
  )
}

export default UserMainSection
