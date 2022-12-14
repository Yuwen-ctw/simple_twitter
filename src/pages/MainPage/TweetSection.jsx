import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SingleTweet } from 'components/Tweets'
import { SectionTitle } from 'components/share'
import Reply from 'components/Reply'
import { backImage } from 'assets/images'
import styles from 'assets/styles/pages/tweetSection.module.scss'
import db from 'db.json'
import { getTweet } from 'api/tweets'

function TweetSection() {
  const navigate = useNavigate()
  const { tweetId } = useParams()
  const [replys, setReplys] = useState([])
  const [tweet, setTweet] = useState({})
  // TODO get tweet and replys data here
  useEffect(() => {
    async function getData() {
      try {
        const { data, status, message } = await getTweet(tweetId)
        status === 'success' ? setTweet(data.tweet) : console.error(message)
      } catch (err) {
        console.error(err)
      }
    }
    getData()
    setReplys(db.replys)
  }, [])

  function handleHeaderClick() {
    navigate(-1)
  }
  function handleLikeClick() {
    setTweet({ ...tweet, isLiked: !tweet.isLiked })
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
      <SingleTweet tweet={tweet} onLikeClick={handleLikeClick} />
      <ul>{replyList}</ul>
    </section>
  )
}

export default TweetSection
