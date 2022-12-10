import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SingleTweet } from 'components/Tweets'
import { SectionTitle } from 'components/share'
import Reply from 'components/Reply'
import { backImage } from 'assets/images'
import styles from 'assets/styles/pages/tweetSection.module.scss'
import db from 'db.json'

function TweetSection() {
  const navigate = useNavigate()
  const { tweetId } = useParams()
  const [replys, setReplys] = useState([])
  // TODO get tweet and replys data here
  useEffect(() => {
    console.log(tweetId)
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
      <div onClick={handleHeaderClick} tabIndex={0}>
        <img src={backImage} alt="A left direction arrow" />
        <SectionTitle text="推文" />
      </div>
      <SingleTweet tweet={db.tweet[0]} />
      <ul>{replyList}</ul>
    </section>
  )
}

export default TweetSection
