import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SingleTweet } from 'components/Tweets'
import { SectionTitle, Spinner } from 'components/share'
import Reply from 'components/Reply'
import { backImage } from 'assets/images'
import styles from 'assets/styles/pages/tweetSection.module.scss'
import db from 'db.json'
import { getTweet } from 'api/tweets'
import { useMainTweets } from 'contexts/MainTweetsContext'
function TweetSection() {
  const navigate = useNavigate()
  const { tweetId } = useParams()
  const [replys, setReplys] = useState([])
  const [tweet, setTweet] = useState({})
  const [loading, setLoading] = useState(false)
  const { handleLikeClick } = useMainTweets()

  // TODO get tweet and replys data here
  useEffect(() => {
    setLoading(true)
    async function getData() {
      const { success, data, message } = await getTweet(tweetId)
      if (success) {
        // cancle the spinner
        setLoading(false)
        // update data
        setTweet(data)
      } else {
        // handle error
        console.error(message)
      }
    }
    getData()
    setReplys(db.replys)
  }, [])

  function handleHeaderClick() {
    navigate(-1)
  }

  const replyList = replys.map((reply) => (
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
