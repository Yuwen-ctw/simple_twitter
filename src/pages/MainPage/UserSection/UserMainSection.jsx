// hooks, apis, contexts,=
import { useEffect, useState } from 'react'
import { useParams, useLocation, useOutletContext } from 'react-router-dom'
import useFetch from 'customHooks/useFetch'
import { getUserInfoData } from 'api/users'
import { useNewTweet } from 'contexts/NewTweetContext'
import { useReply } from 'contexts/ReplyContext'
// components
import { MainTweet } from 'components/Tweets'
import { Spinner } from 'components/share'
import { useEdit } from 'contexts/EditContext'

function UserMainSection() {
  const { handleUserOrTweetClick } = useOutletContext()
  const { userId } = useParams()
  const pathnames = useLocation().pathname.split('/')
  const fieldName = pathnames[pathnames.length - 1]
  const [tweets, setTweets] = useState([])
  const { handleToggleLikeTweet } = useNewTweet()
  const { handleOpenModal, isReplyCreated } = useReply()
  const { isEdited } = useEdit()
  const { data, loading, refetch } = useFetch(getUserInfoData, {
    fieldName,
    userId,
  })

  // get data
  useEffect(() => {
    if (!data) return
    setTweets(data)
  }, [loading])

  // refetch when added new reply or edited profile
  useEffect(() => {
    if (!data) return
    if (!isReplyCreated && !isEdited) return
    refetch(getUserInfoData, {
      fieldName,
      userId,
    })
  }, [isReplyCreated, isEdited])
  // refetch when switched route
  useEffect(() => {
    if (!data) return
    refetch(getUserInfoData, {
      fieldName,
      userId,
    })
  }, [fieldName])

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
