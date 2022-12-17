// hooks and context
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// components
import { SingleTweet } from 'components/Tweets'
import { getAllReplies, getTweet, likeTweet, dislikeTweet } from 'api/tweets'
import Reply from 'components/Reply'
import { SectionTitle, Spinner } from 'components/share'
// assests
import { backImage } from 'assets/images'
import styles from 'assets/styles/pages/tweetSection.module.scss'

function TweetSection() {
  const [replies, setReplies] = useState([])
  const [tweet, setTweet] = useState({})
  const [loading, setLoading] = useState(false)
  const { tweetId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // show loading spinner
    setLoading(true)

    async function getTweetAndReplies() {
      const tweetPromise = getTweet(tweetId)
      const repliesPromise = getAllReplies(tweetId)
      const [tweetResult, repliesResult] = await Promise.all([
        tweetPromise,
        repliesPromise,
      ])
      console.log(tweetResult, repliesResult)
      if (tweetResult.success && repliesResult.success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweet(tweetResult.data)
        setReplies(repliesResult.data)
      } else {
        const errMsg = tweetResult.message || repliesResult.message
        console.error(errMsg)
      }
    }
    getTweetAndReplies()
  }, [])

  async function handleLikeClick(tweetId, isLiked) {
    const { success, message } = isLiked
      ? await dislikeTweet(tweetId)
      : await likeTweet(tweetId)
    if (success) {
      setTweet({
        ...tweet,
        isLiked: !tweet.isLiked,
        likeCount: isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1,
      })
    } else {
      console.error(message)
    }
  }

  function handleHeaderClick() {
    navigate(-1)
  }

  const replyList = replies.map((reply) => (
    <Reply key={reply.id} reply={reply} />
  ))

  return (
    <section className={[styles.sectionWrapper, 'scrollbar'].join(' ')}>
      <div onClick={handleHeaderClick}>
        <img src={backImage} alt="A left direction arrow" />
        <SectionTitle text="推文" />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <SingleTweet tweet={tweet} onLikeClick={handleLikeClick} />
          <ul>{replyList}</ul>
        </>
      )}
    </section>
  )
}

export default TweetSection
