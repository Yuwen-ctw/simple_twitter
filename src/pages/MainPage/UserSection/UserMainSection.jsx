// hooks, apis, contexts,=
import { useEffect, useState } from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import { getUserInfoData } from 'api/users'
import { useNewTweet } from 'contexts/NewTweetContext'
import { useReply } from 'contexts/ReplyContext'
// components
import { MainTweet } from 'components/Tweets'
import { Spinner } from 'components/share'

function UserMainSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { userId } = useParams()
  const { pathname } = useLocation()
  const pathnames = useLocation().pathname.split('/')
  const sectionName = pathnames[pathnames.length - 1]
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)
  const { handleToggleLikeTweet } = useNewTweet()
  const { handleOpenModal, isReplyCreated } = useReply()

  // get data
  useEffect(() => {
    setLoading(true)
    async function getData() {
      const { success, data, message } = await getUserInfoData(
        sectionName,
        userId
      )
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweets(data)
      } else {
        // handle error
        console.error(message)
      }
    }
    getData()
  }, [isReplyCreated, pathname])

  async function handleLikeClick(tweetId, isLiked) {
    const { success, message } = await handleToggleLikeTweet(tweetId, isLiked)
    if (success) {
      setTweets((draft) =>
        draft.map((tweet) => {
          if (tweet.id === tweetId)
            return {
              ...tweet,
              isLiked: !tweet.isLiked,
              likeCount: isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
            }
          return tweet
        })
      )
      // handle failed
    } else {
      console.error(message)
    }
  }

  // map data
  const tweetList = tweets.map((tweet) => {
    return (
      <MainTweet
        key={tweet.id}
        tweet={tweet}
        onLikeClick={handleLikeClick}
        onReplyClick={handleOpenModal}
      />
    )
  })
  return (
    <ul onClick={handleUserOrTweetClick}>
      {loading ? <Spinner /> : <>{tweetList}</>}
    </ul>
  )
}

export default UserMainSection
